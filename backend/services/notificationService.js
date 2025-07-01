import {Notification} from "../models/notificationModel.js";

export const notify = {
  // Order notifications
  newOrder: async (order) => {
    await Notification.create({
      title: "New Order Received",
      message: `Order #${
        order.orderId
      } has benn placed for ₦${order.totalAmount.toLocaleString()}`,
      type: "order",
      priority: "high",
    });
  },

  // Inventory notifications
  lowStock: async (product) => {
    await Notification.create({
      title: "Product Out of Stock",
      message: `${product.name} is now out of stock`,
      type: "inventory",
      priority: "high",
    });
  },

  // Payment notifications
  paymentProcessed: async (order) => {
    await Notification.create({
      title: "Payment Processed",
      message: `Payment for order #${order.orderId} was successful`,
      type: "payment",
      priority: "medium",
    });
  },

  // User notifications
  newSignUp: async (user) => {
    await Notification.create({
      title: "New Sign Up",
      message: `User ${user.name} just created an account.`,
      type: "user",
      priority: "low",
    });
  },
};
