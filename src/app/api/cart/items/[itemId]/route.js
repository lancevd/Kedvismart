import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Cart from '@/models/Cart';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI);
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { itemId } = params;
    const { quantity } = await request.json();
    const cartId = cookies().get('cart_id')?.value;

    if (!cartId) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    const cart = await Cart.findOne({ cartId });
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return NextResponse.json({ message: 'Item not found in cart' }, { status: 404 });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    
    const updatedCart = await Cart.findOne({ cartId }).populate('items.product');
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json({ message: 'Failed to update cart item' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { itemId } = params;
    const cartId = cookies().get('cart_id')?.value;

    if (!cartId) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    const cart = await Cart.findOne({ cartId });
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();

    const updatedCart = await Cart.findOne({ cartId }).populate('items.product');
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return NextResponse.json({ message: 'Failed to delete cart item' }, { status: 500 });
  }
}
