import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI);
  }
}

export async function GET() {
  try {
    await connectDB();
    
    // Sort by price descending for "Top Selling" (placeholder logic)
    const products = await Product.find().sort({ price: -1 }).limit(8);

    const transformedData = products.map(p => ({
      id: p._id,
      name: p.name,
      permalink: p.slug,
      price: { formatted: p.price.toLocaleString() },
      image: { 
        url: p.images?.[0]?.url || (typeof p.images?.[0] === 'string' ? p.images[0] : "") 
      }
    }));

    return NextResponse.json({ data: transformedData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching top products:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
