
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
}, {
  _id: false, // we don't need an ID for each item in the array
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // nullable for guest carts
  },
  sessionId: {
    type: String,
    // for guest carts, we'll store a session ID (could be a random string)
  },
  items: [cartItemSchema],
}, {
  timestamps: true,
});

// Index for faster lookup by userId or sessionId
cartSchema.index({ userId: 1, sessionId: 1 });

export default mongoose.model('Cart', cartSchema);

