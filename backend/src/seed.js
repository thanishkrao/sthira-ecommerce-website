// Seed script to populate database with sample products
// Run with: node src/seed.js

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected for seeding");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const sampleProducts = [
  // WOMEN
  {
    name: "Classic White Cotton Blouse",
    description: "Elegant white cotton blouse with a relaxed fit. Perfect for both casual and formal occasions. Features a subtle button-down front and classic collar.",
    price: 1499,
    discount: 20,
    category: "women",
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600",
    stock: 25,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Cream", "Light Blue"],
  },
  {
    name: "High-Waisted Tailored Trousers",
    description: "Sophisticated high-waisted trousers with a tailored fit. Made from premium stretch fabric for all-day comfort.",
    price: 2299,
    discount: 0,
    category: "women",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600",
    stock: 20,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Beige"],
  },
  {
    name: "Floral Print Maxi Dress",
    description: "Beautiful flowing maxi dress with a romantic floral print. Features adjustable spaghetti straps and a flattering A-line silhouette.",
    price: 2799,
    discount: 15,
    category: "women",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Floral Blue", "Floral Pink"],
  },
  {
    name: "Cozy Knit Cardigan",
    description: "Soft and warm knit cardigan perfect for layering. Features front button closure and ribbed trim details.",
    price: 1899,
    discount: 10,
    category: "women",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600",
    stock: 30,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Gray", "Brown"],
  },
  {
    name: "Denim A-Line Skirt",
    description: "Classic denim skirt with a timeless A-line cut. Versatile piece that pairs well with any top.",
    price: 1299,
    discount: 0,
    category: "women",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0afe1?w=600",
    stock: 22,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Light Wash", "Dark Wash"],
  },

  // MEN
  {
    name: "Premium Slim Fit Oxford Shirt",
    description: "Classic Oxford shirt crafted from 100% cotton. Features a button-down collar and slim fit design for a modern look.",
    price: 1699,
    discount: 0,
    category: "men",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
    stock: 35,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink"],
  },
  {
    name: "Relaxed Fit Chino Pants",
    description: "Comfortable chino pants with a relaxed fit. Made from soft cotton twill with a hint of stretch.",
    price: 1999,
    discount: 25,
    category: "men",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600",
    stock: 28,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Khaki", "Navy", "Olive"],
  },
  {
    name: "Crew Neck Wool Sweater",
    description: "Luxurious wool blend sweater with a classic crew neck. Perfect for cooler weather and office wear.",
    price: 2499,
    discount: 0,
    category: "men",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600",
    stock: 20,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Navy", "Burgundy"],
  },
  {
    name: "Classic Denim Jacket",
    description: "Timeless denim jacket with a modern fit. Features traditional button front and chest pockets.",
    price: 2999,
    discount: 10,
    category: "men",
    image: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=600",
    stock: 18,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Medium Wash", "Dark Wash"],
  },
  {
    name: "Essential Cotton T-Shirt",
    description: "Soft organic cotton t-shirt with a comfortable regular fit. A wardrobe essential in versatile colors.",
    price: 799,
    discount: 0,
    category: "men",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    stock: 50,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray", "Navy"],
  },

  // KIDS
  {
    name: "Colorful Printed T-Shirt",
    description: "Fun and playful printed t-shirt for kids. Made from soft, breathable cotton that's gentle on skin.",
    price: 599,
    discount: 15,
    category: "kids",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
    stock: 40,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: ["Blue", "Red", "Yellow"],
  },
  {
    name: "Comfortable Jogger Pants",
    description: "Stretchy jogger pants perfect for active kids. Features elastic waistband and cuffed ankles.",
    price: 899,
    discount: 0,
    category: "kids",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600",
    stock: 35,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: ["Gray", "Navy", "Black"],
  },
  {
    name: "Cute Floral Dress",
    description: "Adorable floral dress for girls. Features a twirl-worthy skirt and comfortable cotton fabric.",
    price: 1199,
    discount: 20,
    category: "kids",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600",
    stock: 25,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: ["Pink Floral", "Blue Floral"],
  },
  {
    name: "Cozy Hoodie Sweatshirt",
    description: "Warm and cozy hoodie for kids. Features kangaroo pocket and soft fleece lining.",
    price: 999,
    discount: 0,
    category: "kids",
    image: "https://images.unsplash.com/photo-1445796886651-d31a2c15f3ce?w=600",
    stock: 30,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    colors: ["Red", "Blue", "Green", "Purple"],
  },

  // ACCESSORIES
  {
    name: "Leather Crossbody Bag",
    description: "Elegant leather crossbody bag with adjustable strap. Features multiple compartments for organization.",
    price: 2499,
    discount: 0,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
    stock: 20,
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Tan"],
  },
  {
    name: "Classic Wool Scarf",
    description: "Soft wool blend scarf in timeless patterns. Perfect for adding warmth and style to any outfit.",
    price: 899,
    discount: 10,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600",
    stock: 40,
    sizes: ["One Size"],
    colors: ["Gray", "Burgundy", "Navy", "Camel"],
  },
  {
    name: "Aviator Sunglasses",
    description: "Classic aviator sunglasses with UV protection. Lightweight metal frame with comfortable nose pads.",
    price: 1299,
    discount: 15,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    stock: 45,
    sizes: ["One Size"],
    colors: ["Gold/Brown", "Silver/Gray", "Black/Black"],
  },
  {
    name: "Minimalist Leather Watch",
    description: "Elegant minimalist watch with genuine leather strap. Features clean dial design and reliable quartz movement.",
    price: 3499,
    discount: 0,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
    stock: 15,
    sizes: ["One Size"],
    colors: ["Black/Silver", "Brown/Gold", "Navy/Silver"],
  },
  {
    name: "Canvas Tote Bag",
    description: "Spacious canvas tote bag perfect for everyday use. Features reinforced handles and inner pocket.",
    price: 799,
    discount: 0,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600",
    stock: 50,
    sizes: ["One Size"],
    colors: ["Natural", "Black", "Navy"],
  },
  {
    name: "Silk Hair Scrunchies Set",
    description: "Set of 3 luxurious silk scrunchies. Gentle on hair and adds a stylish touch to any hairstyle.",
    price: 499,
    discount: 0,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600",
    stock: 60,
    sizes: ["One Size"],
    colors: ["Black/Pink/White", "Neutral Set", "Pastel Set"],
  },
];

const adminUser = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@sthira.com",
  password: "admin123",
  isAdmin: true,
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log("🗑️  Clearing existing products...");
    await Product.deleteMany({});

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (!existingAdmin) {
      console.log("👤 Creating admin user...");
      await User.create(adminUser);
      console.log("✅ Admin user created: admin@sthira.com / admin123");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    // Insert sample products
    console.log("📦 Seeding products...");
    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} products seeded successfully!`);

    console.log("\n🎉 Database seeding completed!");
    console.log("📧 Admin login: admin@sthira.com");
    console.log("🔑 Admin password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
