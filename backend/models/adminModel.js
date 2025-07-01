import mongoose from "mongoose";
import validator from "validator";

const adminSchema = new mongoose.Schema({
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
  isActive: {
    type: Boolean,
    default: true,
    index: true 
  },
  role: {
    type: String,
    enum: ["superadmin"],
    default: "superadmin",
  },
  permissions: [String],
  lastLogin: Date
}, {timestamps: true});

export const Admin = mongoose.model("AdminUser", adminSchema);

