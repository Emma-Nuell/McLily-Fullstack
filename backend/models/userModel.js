import mongoose from "mongoose";
import validator from "validator";
import { populateUserOrders } from "../utils/helpers";

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
    orders: [
      {
        orderId: { type: String, ref: "Order", required: true },
      orderedAt: {type: Date, default: Date.now}
      }
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

userSchema.methods.addOrder = function (orderId) {
  const orderExists = this.orders.some(order => order.orderId === orderId)
  if (!orderExists) {
    this.orders.push({ orderId, orderedAt: new Date() }) 
  }
  return this.save()
}

userSchema.methods.removeOrder = function (orderId) {
  this.orders = this.orders.filter(order => order.orderId !== orderId)
  return this.save()
}

userSchema.methods.getOrders = function () {
  return this.orders.sort((a,b) => b.orderedAt - a.orderedAt)
}

userSchema.statics.findUserWithOrders = async function (userId) {
  const user = await this.findOne({ userId: userId })
  if (!user) return null

  const populatedOrders = await populateUserOrders(user.orders)
  return {
    ...user.toObject(),
    orders: populatedOrders
  }
}

export const User = mongoose.model("User", userSchema);
