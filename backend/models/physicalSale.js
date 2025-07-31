import  mongoose from "mongoose";

const PhysicalOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
    },
    items: [
      {
        productId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        size: {
          form: String,
          value: String,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    amountPaid: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    amountRemaining: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentType: {
      type: String,
      enum: ["full", "credit"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "transfer", "credit"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "partially_paid", "cancelled"],
      default: "pending",
    },
    paymentHistory: {
      type: [
        {
          date: { type: Date, default: Date.now },
          amount: { type: Number, required: true },
          method: { type: String, required: true },
          notes: { type: String },
        },
      ],
      default: [],
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const PhysicalOrder = mongoose.model(
  "PhysicalOrder",
  PhysicalOrderSchema
);