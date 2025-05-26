import Product from "../../models/Product";
import mongoose from "mongoose";
import { withRateLimit } from "../../models/RateLimiter";  // adjust path accordingly

// Original handlers
async function createProduct(req) {
  const body = await req.json();
  await mongoose.connect(process.env.MONGO_URL);
  const createdProduct = await Product.create(body);
  return Response.json(createdProduct);
}

async function getProducts(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const products = await Product.find();
  return Response.json(products);
}

async function deleteProduct(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Product ID is required" }), {
      status: 400,
    });
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    await Product.findByIdAndDelete(id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to delete product" }), {
      status: 500,
    });
  }
}

async function updateProduct(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Product ID is required" }), {
      status: 400,
    });
  }

  try {
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URL);

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to update product" }), {
      status: 500,
    });
  }
}

// Wrap handlers with rate limiter
export const POST = withRateLimit(createProduct, { limit: 100, windowMs: 1000 });
export const GET = withRateLimit(getProducts, { limit: 100, windowMs: 1000 });
export const DELETE = withRateLimit(deleteProduct, { limit: 100, windowMs: 1000 });
export const PUT = withRateLimit(updateProduct, { limit: 100, windowMs: 1000 });
