import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Buffer } from 'buffer';

// Configuration already done in lib/cloudinary.js but we ensure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // Protect route: only admin (optional, but we can allow authenticated users to upload images for products)
    const { session } = await auth(); // we need to import auth from next-auth
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file'); // expecting field name 'file'
    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Optional: generate a unique filename
    const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'kedvismart', public_id: filename },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json({ message: 'Failed to upload file' }, { status: 500 });
  }
}

// Helper to import auth options
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
async function auth() {
  return getServerSession(authOptions);
}
