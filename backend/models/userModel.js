import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: [{
    type: Number,
    validate: {
      validator: (value) => validator.isMobilePhone(value.toString(), "en-IN"),
      message: "Invalid phone number",
    },
  }   
  ],
  cart: [
    {
      productId: { type: String, ref: "Product" },
      amount: { type: Number, required: true },
      size: { type: String, default: null },
    },
  ],
  wishlist: [
    {
      productId: { type: String, ref: "Product" },
    },
  ],
  address: [
    {
      name: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User
