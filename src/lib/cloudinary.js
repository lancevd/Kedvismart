
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage engine for multer (if using multer)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'kedvismart',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
  },
});

export { cloudinary, storage };

