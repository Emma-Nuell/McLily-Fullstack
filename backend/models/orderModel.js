import  mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: String,
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number, // store price at the time of order
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
        line1: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
    },
    orderItems: [orderItemSchema],
    subtotal: Number,
    shippingFee: Number,
    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "bank_transfer", "cash_on_delivery"],
    },
    orderStatus: {
      type: String,
      enum: ["processing", "pending", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
  
  export default mongoose.model('Order', orderSchema);