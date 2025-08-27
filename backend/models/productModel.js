import mongoose from "mongoose";

//schema
const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true, 
    index: true,
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
   default: [],
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
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
        userName: {
          type: String,
          required: true,
        },
        reviewTitle: {
          type: String,
        },
        reviewMessage: {
          type: String,
        },
        rating: {
          type: Number,
          required: true
        },
        verified: {
          type: Boolean,
          default: true
        },
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  featured: {
    type: Boolean,
    default: false,
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
      default: 0, 
    },
    reviewsCount: {
      type: Number,
      default: 0, 
    },
  },
}, { timestamps: true });

ProductSchema.index({ category: 1, subCategory: 1 }); // For category filtering
ProductSchema.index({ price: 1 }); // For price sorting
ProductSchema.index({ sales: -1 }); // For top sellers
ProductSchema.index({ createdAt: -1 }); // For newest products
ProductSchema.index({ 'rating.average': -1 }); // For best rated
ProductSchema.index({ featured: 1 }); // For featured products
ProductSchema.index({ stock: 1 }); // For stock checking
ProductSchema.index({ productId: 1 }); // For quick product lookups

export const Product = mongoose.model("Product", ProductSchema);
