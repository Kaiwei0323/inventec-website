import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    enum: ['ISV', 'Houston'], // Optional validation
  },
}, {
  timestamps: true,
  strict: true,
});

StockSchema.index({ name: 1, sku: 1, location: 1 }, { unique: true });

const Stock = mongoose.models.Stock || mongoose.model('Stock', StockSchema);
export default Stock;
