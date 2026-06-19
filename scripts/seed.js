import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Category from '../src/models/Category.js';
import Product from '../src/models/Product.js';
import User from '../src/models/User.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Men', slug: 'men', description: "Men's clothing and accessories" },
      { name: 'Women', slug: 'women', description: "Women's clothing and accessories" },
      { name: 'Kids', slug: 'kids', description: "Children's clothing and toys" },
      { name: 'Accessories', slug: 'accessories', description: 'Bags, shoes, jewelry, etc.' },
    ]);
    console.log(`Created ${categories.length} categories`);

    // Get category IDs for reference
    const [menCat, womenCat, kidsCat, accCat] = categories;

    // Create sample products
    const products = await Product.insertMany([
      {
        name: 'Classic T-Shirt',
        slug: 'classic-t-shirt',
        description: 'A comfortable, classic fit t-shirt made of premium cotton.',
        price: 2500, // 25.00 NGN in kobo
        category: menCat._id,
        images: [
          'https://res.cloudinary.com/ddydgzuu7/image/upload/v1600000000/kedvismart/tshirt1.jpg',
          'https://res.cloudinary.com/ddydgzuu7/image/upload/v1600000000/kedvismart/tshirt2.jpg'
        ],
        stock: 50,
        isActive: true,
      },
      {
        name: 'Denim Jeans',
        slug: 'denim-jeans',
        description: 'Straight-fit denim jeans with a modern cut.',
        price: 8000, // 80.00 NGN
        category: menCat._id,
        images: [
          'https://res.cloudinary.com/ddydgzuu7/image/upload/v1600000000/kedvismart/jeans1.jpg'
        ],
        stock: 30,
        isActive: true,
      },
      {
        name: 'Summer Dress',
        slug: 'summer-dress',
        description: 'Light and breezy summer dress perfect for warm weather.',
        price: 6000, // 60.00 NGN
        category: womenCat._id,
        images: [
          'https://res.cloudinary.com/ddydgzuu7/image/upload/v1600000000/kedvismart/dress1.jpg'
        ],
        stock: 25,
        isActive: true,
      },
      {
        name: 'Kids Polo Shirt',
        slug: 'kids-polo-shirt',
        description: 'Soft polo shirt for kids, available in multiple colors.',
        price: 3500, // 35.00 NGN
        category: kidsCat._id,
        images: [
          'https://res.cloudinary.com/ddydgzuu7/image/upload/v1600000000/kedvismart/polo1.jpg'
        ],
        stock: 40,
        isActive: true,
      },
      {
        name: 'Leather Handbag',
        slug: 'leather-handbag',
        description: 'Genuine leather handbag with ample space and interior pockets.',
        price: 15000, // 150.00 NGN
        category: accCat._id,
        images: [
          'https://res.cloudinary.com/ddydgzuu7/image/upload/v1600000000/kedvismart/bag1.jpg'
        ],
        stock: 15,
        isActive: true,
      },
    ]);
    console.log(`Created ${products.length} products`);

    // Create a sample admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@kedvismart.com',
      password: 'admin123', // will be hashed by pre-save hook
      role: 'admin',
    });
    console.log('Created admin user:', adminUser.email);

    // Create a sample regular user
    const regularUser = await User.create({
      name: 'Regular User',
      email: 'user@kedvismart.com',
      password: 'user123',
      role: 'user',
    });
    console.log('Created regular user:', regularUser.email);

    console.log('Seeding completed successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

connectDB().then(() => seedData());
