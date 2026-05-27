const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config();

const sampleProducts = [
  {
    name: "Apple iPhone 15 Pro",
    description:
      "The latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features a 6.1-inch Super Retina XDR display with ProMotion, 48MP main camera, and USB-C connectivity.",
    price: 999,
    category: "Electronics",
    stock: 50,
    rating: 4.8,
    numReviews: 125,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    ],
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading noise cancellation with exceptional sound quality. Features 30-hour battery life, quick charging, and superior call quality with advanced noise reduction.",
    price: 399,
    category: "Electronics",
    stock: 100,
    rating: 4.7,
    numReviews: 89,
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500",
    ],
  },
  {
    name: "Premium Leather Jacket",
    description:
      "Genuine leather jacket with classic design. Perfect for all seasons, features multiple pockets, comfortable fit, and durable construction.",
    price: 199,
    category: "Clothing",
    stock: 75,
    rating: 4.5,
    numReviews: 45,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=500",
    ],
  },
  {
    name: "The Midnight Library",
    description:
      "A novel by Matt Haig - Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right.",
    price: 24.99,
    category: "Books",
    stock: 200,
    rating: 4.9,
    numReviews: 234,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    ],
  },
  {
    name: "Gaming Mechanical Keyboard",
    description:
      "RGB mechanical keyboard with blue switches. Features customizable lighting, programmable keys, and durable aluminum construction. Perfect for gaming and typing.",
    price: 129.99,
    category: "Electronics",
    stock: 60,
    rating: 4.6,
    numReviews: 156,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
    ],
  },
  {
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with silent clicks and long battery life. Features adjustable DPI settings and comfortable grip for long hours of use.",
    price: 49.99,
    category: "Electronics",
    stock: 150,
    rating: 4.4,
    numReviews: 78,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
    ],
  },
  {
    name: "Smart Watch",
    description:
      "Fitness tracker with heart rate monitor, GPS, and 7-day battery life. Track your steps, sleep, and workouts with this premium smartwatch.",
    price: 299.99,
    category: "Electronics",
    stock: 85,
    rating: 4.3,
    numReviews: 112,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
    ],
  },
  {
    name: "Yoga Mat",
    description:
      "Eco-friendly non-slip yoga mat with carrying strap. Perfect for yoga, pilates, and floor exercises. 6mm thickness for extra comfort.",
    price: 39.99,
    category: "Sports",
    stock: 120,
    rating: 4.7,
    numReviews: 67,
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    ],
  },
  {
    name: "Coffee Maker",
    description:
      "Programmable coffee maker with thermal carafe. Brew up to 12 cups of delicious coffee. Features auto shut-off and reusable filter.",
    price: 89.99,
    category: "Home & Garden",
    stock: 45,
    rating: 4.5,
    numReviews: 92,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9bba02b6c3b2?w=500",
      "https://images.unsplash.com/photo-1587735243496-0b7e384a5a7f?w=500",
    ],
  },
  {
    name: "Desk Lamp",
    description:
      "LED desk lamp with adjustable brightness and color temperature. Features USB charging port and flexible gooseneck design.",
    price: 35.99,
    category: "Home & Garden",
    stock: 200,
    rating: 4.2,
    numReviews: 54,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6b0579d4aae?w=500",
      "https://images.unsplash.com/photo-1594060403758-768c6ad74adf?w=500",
    ],
  },
  {
    name: "Backpack",
    description:
      "Water-resistant laptop backpack with USB charging port. Features multiple compartments, padded shoulder straps, and durable zippers.",
    price: 59.99,
    category: "Clothing",
    stock: 95,
    rating: 4.6,
    numReviews: 88,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500",
    ],
  },
  {
    name: "Running Shoes",
    description:
      "Comfortable running shoes with breathable mesh and cushioned sole. Perfect for running, walking, and daily wear.",
    price: 79.99,
    category: "Clothing",
    stock: 130,
    rating: 4.4,
    numReviews: 145,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
    ],
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB - no options needed for Mongoose 7+
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";
    console.log("Connecting to MongoDB:", mongoURI);

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");

    // Clear existing products
    const deletedProducts = await Product.deleteMany({});
    console.log(`✅ Cleared ${deletedProducts.deletedCount} existing products`);

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${insertedProducts.length} sample products`);

    // Create admin user if it doesn't exist
    const adminEmail = "admin@example.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const adminUser = new User({
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      await adminUser.save();
      console.log(
        "✅ Created admin user - Email: admin@example.com, Password: admin123",
      );
    } else {
      console.log("✅ Admin user already exists");
    }

    // List all products to verify
    const allProducts = await Product.find({});
    console.log("\n📦 Products in database:");
    allProducts.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - $${product.price}`);
    });

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Products: ${insertedProducts.length}`);
    console.log(`   - Admin User: ${adminEmail}`);
    console.log("\n🌐 You can now:");
    console.log("   1. Visit http://localhost:3000 to see products");
    console.log("   2. Login as admin to manage products");
    console.log("   3. Create customer accounts to test purchases");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    if (error.code === "ECONNREFUSED") {
      console.error("\n💡 Make sure MongoDB is running!");
      console.error("   Start MongoDB with: mongod");
      console.error("   Or use MongoDB Atlas for cloud database");
    }
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
