import mongoose from 'mongoose';

const ShipmentItemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  }
});

const ShipmentSchema = new mongoose.Schema({
  From: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    enum: ['ISV', 'Houston'],
  },
  to: {
    type: String,
    required: [true, 'Shipping destination is required'],
    trim: true,
  },
  items: {
    type: [ShipmentItemSchema],
    required: [true, 'At least one item is required'],
    validate: [
      {
        validator: function(items) {
          return items.length > 0;
        },
        message: 'Shipment must contain at least one item'
      }
    ]
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true,
  strict: true,
});

const Shipment = mongoose.models.Shipment || mongoose.model('Shipment', ShipmentSchema);
export default Shipment;
