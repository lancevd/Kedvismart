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

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const sessionId = cookies().get('cart_id')?.value;

    let cart;
    if (session) {
      cart = await Cart.findOne({ userId: session.user.id }).populate('items.productId');
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId }).populate('items.productId');
    }

    if (!cart) {
      return NextResponse.json({ items: [], totalPrice: 0 });
    }
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ message: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { productId, quantity } = await request.json();
    const session = await getServerSession(authOptions);
    let sessionId = cookies().get('cart_id')?.value;

    let cart;
    if (session) {
      cart = await Cart.findOne({ userId: session.user.id });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      if (!session) {
        sessionId = sessionId || Math.random().toString(36).substring(7);
        cookies().set('cart_id', sessionId, { maxAge: 60 * 60 * 24 * 7 });
      }
      cart = new Cart({
        userId: session?.user.id,
        sessionId: session ? undefined : sessionId,
        items: []
      });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += (quantity || 1);
    } else {
      cart.items.push({ productId, quantity: (quantity || 1) });
    }

    await cart.save();
    const updatedCart = await cart.populate('items.productId');
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ message: 'Failed to add to cart' }, { status: 500 });
  }
}
