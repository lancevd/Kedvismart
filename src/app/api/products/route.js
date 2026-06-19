import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    // Connect to DB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let filter = { isActive: true };
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (minPrice !== null && maxPrice !== null) {
      filter.price = { $gte: parseFloat(minPrice) * 100, $lte: parseFloat(maxPrice) * 100 };
    } else if (minPrice !== null) {
      filter.price = { $gte: parseFloat(minPrice) * 100 };
    } else if (maxPrice !== null) {
      filter.price = { $lte: parseFloat(maxPrice) * 100 };
    }

    const products = await Product.find(filter).populate('category', 'name');
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Protect route: only admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    const data = await request.json();
    // Expect price in NGN (e.g., 25.00) convert to kobo
    const productData = {
      ...data,
      price: Math.round(parseFloat(data.price) * 100),
    };
    const product = new Product(productData);
    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ message: 'Failed to create product' }, { status: 500 });
  }
}
