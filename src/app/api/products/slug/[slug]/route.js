import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI);
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = params;
    const product = await Product.findOne({ slug, isActive: true }).populate('category', 'name');
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json({ message: 'Failed to fetch product' }, { status: 500 });
  }
}
