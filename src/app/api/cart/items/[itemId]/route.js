import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Cart from '@/models/Cart';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';

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
    const session = await getServerSession(authOptions);
    const sessionId = cookies().get('cart_id')?.value;

    let cart;
    if (session) {
      cart = await Cart.findOne({ userId: session.user.id });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    // Since items are an array, we find by sub-document _id (automatically added by Mongoose in items array)
    // Or if I used _id: false in the schema, I should find by productId.
    // Wait, in src/models/Cart.js I used _id: false for items. I should find by productId.
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === itemId);
    if (itemIndex === -1) {
      return NextResponse.json({ message: 'Item not found in cart' }, { status: 404 });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    
    const updatedCart = await cart.populate('items.productId');
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
    const session = await getServerSession(authOptions);
    const sessionId = cookies().get('cart_id')?.value;

    let cart;
    if (session) {
      cart = await Cart.findOne({ userId: session.user.id });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== itemId);
    await cart.save();

    const updatedCart = await cart.populate('items.productId');
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return NextResponse.json({ message: 'Failed to delete cart item' }, { status: 500 });
  }
}
