
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, // Cloudinary URL
  },
}, {
  timestamps: true,
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema);

