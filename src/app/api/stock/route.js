import Stock from "../../models/Stock";
import mongoose from "mongoose";
import { withRateLimit } from "../../models/RateLimiter";

async function getStocks() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const stocks = await Stock.find().sort({ createdAt: -1 });
    return Response.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return Response.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}

async function createStock(req) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);
    
    // Validate required fields
    if (!body.name || !body.sku || !body.quantity || !body.location) {
      console.log('Missing required fields:', { 
        name: !!body.name, 
        sku: !!body.sku, 
        quantity: !!body.quantity, 
        location: !!body.location 
      });
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.MONGO_URL);
    
    // Create new stock item with explicit field mapping
    const stockData = {
      name: body.name,
      sku: body.sku,
      quantity: body.quantity,
      location: body.location
    };
    
    console.log('Creating stock with data:', stockData);
    
    const createdStock = await Stock.create(stockData);
    console.log('Created stock item:', createdStock.toObject());
    
    return Response.json(createdStock);
  } catch (error) {
    console.error('Error creating stock:', error);
    if (error.code === 11000) {
      return Response.json(
        { error: 'A product with the same name, SKU, and location already exists.' },
        { status: 400 }
      );
    }
    return Response.json(
      { error: 'Something went wrong while creating the stock item.' },
      { status: 500 }
    );
  }
}

async function updateStock(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return Response.json(
        { error: 'Stock ID is required' },
        { status: 400 }
      );
    }

    if (!body.quantity || body.quantity < 1) {
      return Response.json(
        { error: 'Valid quantity is required' },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.MONGO_URL);
    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { quantity: body.quantity },
      { new: true }
    );

    if (!updatedStock) {
      return Response.json(
        { error: 'Stock item not found' },
        { status: 404 }
      );
    }

    return Response.json(updatedStock);
  } catch (error) {
    console.error('Error updating stock:', error);
    return Response.json(
      { error: 'Failed to update stock item' },
      { status: 500 }
    );
  }
}

async function deleteStock(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return Response.json(
        { error: 'Stock ID is required' },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.MONGO_URL);
    const deletedStock = await Stock.findByIdAndDelete(id);
    
    if (!deletedStock) {
      return Response.json(
        { error: 'Stock item not found' },
        { status: 404 }
      );
    }

    return Response.json({ message: 'Stock item deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock:', error);
    return Response.json(
      { error: 'Failed to delete stock item' },
      { status: 500 }
    );
  }
}

export const GET = withRateLimit(getStocks, { limit: 100, windowMs: 1000 });
export const POST = withRateLimit(createStock, { limit: 100, windowMs: 1000 });
export const PUT = withRateLimit(updateStock, { limit: 100, windowMs: 1000 });
export const DELETE = withRateLimit(deleteStock, { limit: 100, windowMs: 1000 });
