import  mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
  productName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
  },
  image: {
    type: String,
    required: true
    }
  });
  
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerDetails: {
      name: String,
      email: String,
      phone: String,
      address: {
        street: String,
        city: String,
        state: String,
        country: {
          type: String,
          default: "Nigeria"
        },
      },
    },
    orderItems: [orderItemSchema],
    itemCount: {
      type: Number,
      required: true,
      min: 1,
    },
    subtotal: Number,
    shippingFee: Number,
    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "partially_refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "bank_transfer", "cash_on_delivery", "paystack"],
    },
    paymentDetails: {
      transactionId: String,
      paymentDate: Date,
      paymentGateway: String,
      currency: {
        type: String,
        default: "NGN"
      },
      gatewayResponse: Object
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Pending", "Shipped","Out_for_delivery", "Delivered", "Cancelled", "Returned", "Refunded"],
      default: "processing",
    },
    statusHistory: [
      {
        status: String,
        changeAt: {
          type: Date,
          default: Date.now,
        },
        changedBy: {
          type: String,
          default: "system"
        },
        note: String
      }
    ],
    deliveryTracking: {
      trackingNumber: String,
      carrier: String,
      estimatedDelivery: Date,
      actualDelivery: Date,
    },
    notes: String,
    orderedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
  
  export const Order =  mongoose.model('Order', orderSchema);