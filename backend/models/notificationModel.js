import mongoose from "mongoose";

//schema
const notificationSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["payment", "inventory", "order", "system", "user", "report"], // You can expand this
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
}, { timestamps: true }); 
  
export const Notification = mongoose.model("Notification", notificationSchema);