import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
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
    phoneNo: [
      {
        type: String,
        validate: {
          validator: (value) =>
            validator.isMobilePhone(value.toString(), "en-NG"),
          message: "Invalid phone number",
        },
      },
    ],
    cart: [
      {
        productId: { type: String, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        size: { type: String, default: null },
      },
    ],
    wishlist: [
      {
        productId: { type: String, ref: "Product" },
        addedAt: { type: Date, default: Date.now},
      },
    ],
    address: {
      type: [
        {
          addressName: {
            type: String,
            default: "Home",
          },
          firstName: {
            type: String,
            required: true,
            trim: true,
          },
          lastName: {
            type: String,
            required: true,
            trim: true,
          },
          phoneNo: {
            type: String,
            required: true,
            validate: {
              validator: (value) =>
                validator.isMobilePhone(value.toString(), "en-IN"),
              message: "Invalid phone number",
            },
          },
          additionalPhoneNo: {
            type: String,
            validate: {
              validator: (value) =>
                validator.isMobilePhone(value.toString(), "en-IN"),
              message: "Invalid phone number",
            },
            default: null,
          },
          street: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            required: true,
          },
          isDefault: {
            type: Boolean,
            default: false,
          },
          country: { type: String, default: "Nigeria" },
          additionalInfo: {
            type: String,
            default: null
          },
        },
      ],
      default: [],
      validate: {
        validator: function (addresses) {
          const defaultCount = addresses.filter(
            (addr) => addr.isDefault
          ).length;
          return defaultCount <= 1;
        },
        message: "Only one default address is allowed",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
