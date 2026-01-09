const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please enter product category"],
      enum: ["men", "women", "kids", "accessories"],
    },
    image: {
      type: String, // URL or path
      required: [true, "Please add a product image"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sizes: {
      type: [String],
      default: ["S", "M", "L", "XL"],
    },
    colors: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
