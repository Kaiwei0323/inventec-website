import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  description: String,
  chip: String,
  support: [String],
  tops: Number,
  category: String,
  platform: String,
  downloadUrl: String,
  detailPage: String
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
