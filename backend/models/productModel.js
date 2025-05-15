import mongoose from "mongoose";

//schema
const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sizes: {
    type: [
      {
        form: String,
        value: String,
        stock: Number,
        price: Number
      },
    ],
    default: null,
  },
  specifications: {
    type: Map, // This allows you to store key-value pairs dynamically
    of: String, // Values must be strings, but you can adjust this as needed
    default: null, // Default to an empty object if not provided
  },
  reviews: {
    type: [
      {
        userId: String,
        comment: String,
        rating: Number,
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  featured: {
    type: Boolean,
    default: null,
  },
  sales: {
    type: Number,
    default: 0
  },
  visits: {
    type: Number,
    default: 0,
  },
  rating: {
    average: {
      type: Number,
      default: 0, // Default rating average
    },
    reviews: {
      type: Number,
      default: 0, // Default number of reviews
    },
  },
});

export const Product = mongoose.model("Product", ProductSchema);
