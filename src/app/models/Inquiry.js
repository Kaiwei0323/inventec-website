import mongoose from 'mongoose';

const InquiryItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  sku: {
    type: String,
    required: false,
  },
});

const InquirySchema = new mongoose.Schema({
  company: { type: String, required: true },
  contact: { type: String, required: true },
  items: [InquiryItemSchema],
  createdAt: { type: Date, default: Date.now },
  fulfilled: { type: Boolean, default: false },
  fulfilledAt: { type: Date },
  submitter: { type: String, required: true },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema); 