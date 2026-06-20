require("dotenv").config();
const mongoose = require("mongoose");
const CategoryModule = require("../src/models/Category");
const ProductModule = require("../src/models/Product");
const UserModule = require("../src/models/User");

const Category = CategoryModule.default || CategoryModule;
const Product = ProductModule.default || ProductModule;
const User = UserModule.default || UserModule;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");
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
      { name: 'Casual', slug: 'casual', description: "Casual wear for everyday" },
      { name: 'Formal', slug: 'formal', description: "Formal business attire" },
      { name: 'Party', slug: 'party', description: "Outfit for parties" },
      { name: 'Gym', slug: 'gym', description: 'Activewear and gym gear' },
    ]);
    console.log(`Created ${categories.length} categories`);

    const [casualCat, formalCat, partyCat, gymCat] = categories;

    // Create sample products using existing public images
    const products = await Product.insertMany([
      {
        name: 'Black Jeans',
        slug: 'black-jeans',
        description: 'Tapered fit black jeans, 100% cotton.',
        price: 1200000, // 12,000.00 NGN in kobo
        category: casualCat._id,
        images: ['/images/black jeans.png'],
        stock: 50,
        isActive: true,
      },
      {
        name: 'Blue Jeans',
        slug: 'blue-jeans',
        description: 'Classic blue denim jeans with a modern cut.',
        price: 1500000, // 15,000.00 NGN
        category: casualCat._id,
        images: ['/images/blue jeans.png'],
        stock: 30,
        isActive: true,
      },
      {
        name: 'Checkered Shirt',
        slug: 'checkered-shirt',
        description: 'Stylish checkered shirt for formal and casual occasions.',
        price: 950000, // 9,500.00 NGN
        category: formalCat._id,
        images: ['/images/checkered shirt.png'],
        stock: 25,
        isActive: true,
      },
      {
        name: 'Orange T-Shirt',
        slug: 'orange-t-shirt',
        description: 'Vibrant orange t-shirt, soft and breathable.',
        price: 500000, // 5,000.00 NGN
        category: casualCat._id,
        images: ['/images/orange t-shirt.png'],
        stock: 40,
        isActive: true,
      },
      {
        name: 'Black T-Shirt',
        slug: 'black-t-shirt',
        description: 'Essential black t-shirt, fits perfectly.',
        price: 500000, // 5,000.00 NGN
        category: casualCat._id,
        images: ['/images/black t-shirt.png'],
        stock: 100,
        isActive: true,
      }
    ]);
    console.log(`Created ${products.length} products`);

    // Create admin user
    await User.create({
      name: "Admin User",
      email: "admin@kedvismart.com",
      password: "admin123",
      role: "admin",
    });
    console.log("Created admin user: admin@kedvismart.com");

    console.log("Seeding completed successfully");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

connectDB().then(() => seedData());
