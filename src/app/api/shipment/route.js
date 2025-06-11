import Shipment from "../../models/Shipment";
import Stock from "../../models/Stock";
import mongoose from "mongoose";
import { withRateLimit } from "../../models/RateLimiter";

async function getShipments() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    return Response.json(shipments);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    return Response.json(
      { error: 'Failed to fetch shipment data' },
      { status: 500 }
    );
  }
}

async function createShipment(req) {
  try {
    const body = await req.json();
    console.log('Received shipment request body:', body);
    
    const { From, to, items, location } = body;

    // Validate required fields
    if (!From || !to || !items || !Array.isArray(items) || items.length === 0) {
      console.log('Missing or invalid required fields:', { 
        From: !!From, 
        to: !!to, 
        items: Array.isArray(items) && items.length > 0
      });
      return Response.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    // Validate items structure
    for (const item of items) {
      if (!item.productName || !item.quantity) {
        console.log('Invalid item structure:', item);
        return Response.json(
          { error: 'Each item must have productName and quantity' },
          { status: 400 }
        );
      }
      if (typeof item.quantity !== 'number' || item.quantity < 1) {
        console.log('Invalid quantity:', item);
        return Response.json(
          { error: 'Quantity must be a positive number' },
          { status: 400 }
        );
      }
    }

    console.log('Attempting to connect to MongoDB...');
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('MongoDB connected successfully');
    } catch (dbError) {
      console.error('MongoDB connection error:', dbError);
      return Response.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }
    
    // Start a transaction
    console.log('Starting transaction...');
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check and update stock quantities
      for (const item of items) {
        console.log(`Checking stock for item: ${item.productName} (${item.sku})`);
        const stockQuery = {
          name: item.productName,
          location: From
        };
        if (item.sku) {
          stockQuery.sku = item.sku;
        }
        const stock = await Stock.findOne(stockQuery).session(session);

        if (!stock) {
          console.log(`Stock not found for: ${item.productName} (${item.sku})`);
          throw new Error(`Stock not found for product: ${item.productName} (SKU: ${item.sku})`);
        }

        console.log(`Current stock quantity: ${stock.quantity}, Requested: ${item.quantity}`);
        if (stock.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product: ${item.productName} (SKU: ${item.sku}). Available: ${stock.quantity}, Requested: ${item.quantity}`);
        }

        // Update stock quantity
        console.log(`Updating stock quantity for: ${item.productName}`);
        await Stock.findByIdAndUpdate(
          stock._id,
          { $inc: { quantity: -item.quantity } },
          { session }
        );
      }

      // Create shipment
      const shipmentData = {
        From,
        to,
        items,
        status: 'pending'
      };
      
      console.log('Creating shipment with data:', shipmentData);
      
      const createdShipment = await Shipment.create([shipmentData], { session });
      
      // Commit the transaction
      console.log('Committing transaction...');
      await session.commitTransaction();
      console.log('Created shipment:', createdShipment[0].toObject());
      
      return Response.json(createdShipment[0], { status: 201 });
    } catch (error) {
      // Rollback the transaction on error
      console.error('Transaction error:', error);
      await session.abortTransaction();
      throw error;
    } finally {
      console.log('Ending session...');
      session.endSession();
    }
  } catch (error) {
    console.error('Error creating shipment:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return Response.json(
      { error: error.message || 'Failed to create shipment' },
      { status: 500 }
    );
  }
}

async function updateShipmentStatus(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return Response.json(
        { error: 'Shipment ID is required' },
        { status: 400 }
      );
    }

    if (!body.status || !['pending', 'shipped', 'delivered', 'cancelled'].includes(body.status)) {
      return Response.json(
        { error: 'Valid status is required (pending, shipped, delivered, or cancelled)' },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.MONGO_URL);
    const updatedShipment = await Shipment.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!updatedShipment) {
      return Response.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    return Response.json(updatedShipment);
  } catch (error) {
    console.error('Error updating shipment:', error);
    return Response.json(
      { error: 'Failed to update shipment' },
      { status: 500 }
    );
  }
}

async function deleteShipment(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();
    const { updateStock } = body;
    
    if (!id) {
      return Response.json(
        { error: 'Shipment ID is required' },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.MONGO_URL);
    
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find the shipment first
      const shipment = await Shipment.findById(id).session(session);
      
      if (!shipment) {
        return Response.json(
          { error: 'Shipment not found' },
          { status: 404 }
        );
      }

      // Handle stock updates only for pending shipments
      if (updateStock && shipment.status === 'pending') {
        // Restore stock quantities
        for (const item of shipment.items) {
          await Stock.findOneAndUpdate(
            {
              name: item.productName,
              sku: item.sku,
              location: shipment.From // Use From instead of location
            },
            { $inc: { quantity: item.quantity } },
            { session }
          );
        }
      }

      // Delete the shipment
      await Shipment.findByIdAndDelete(id).session(session);

      // Commit the transaction
      await session.commitTransaction();

      return Response.json({ 
        message: updateStock 
          ? 'Shipment deleted successfully and stock restored' 
          : 'Shipment history deleted successfully'
      });
    } catch (error) {
      // Rollback the transaction on error
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error('Error deleting shipment:', error);
    return Response.json(
      { error: 'Failed to delete shipment' },
      { status: 500 }
    );
  }
}

export const GET = withRateLimit(getShipments, { limit: 100, windowMs: 1000 });
export const POST = withRateLimit(createShipment, { limit: 100, windowMs: 1000 });
export const PUT = withRateLimit(updateShipmentStatus, { limit: 100, windowMs: 1000 });
export const DELETE = withRateLimit(deleteShipment, { limit: 100, windowMs: 1000 }); 