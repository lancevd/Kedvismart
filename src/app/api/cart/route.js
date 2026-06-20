import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Cart from '@/models/Cart';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI);
  }
}

export async function GET() {
  try {
    await connectDB();
    const cartId = cookies().get('cart_id')?.value;
    if (!cartId) {
      return NextResponse.json({ items: [], totalPrice: 0 });
    }
    const cart = await Cart.findOne({ cartId }).populate('items.product');
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
    const { productId, quantity, color, size } = await request.json();
    let cartId = cookies().get('cart_id')?.value;

    let cart;
    if (cartId) {
      cart = await Cart.findOne({ cartId });
    }

    if (!cart) {
      cartId = Math.random().toString(36).substring(7);
      cart = new Cart({ cartId, items: [] });
      cookies().set('cart_id', cartId, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
    }

    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId && 
      item.color === color && 
      item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, color, size });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ cartId }).populate('items.product');
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ message: 'Failed to add to cart' }, { status: 500 });
  }
}
