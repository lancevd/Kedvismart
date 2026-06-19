
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // If not connected, connect
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    // Try to ping the database
    const ping = await mongoose.connection.db.admin().ping();
    return NextResponse.json({ message: 'Database connected successfully', ping }, { status: 200 });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({ message: 'Database connection failed', error: error.message }, { status: 500 });
  }
}

