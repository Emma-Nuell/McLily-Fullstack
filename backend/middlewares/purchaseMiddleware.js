import { Order } from "../models/orderModel.js";

// Middleware to check if user purchased a product
export const checkPurchase = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    // Check if user has purchased this product
    const hasPurchased = await Order.exists({
      userId,
      "orderItems.productId": productId,
      orderStatus: "delivered", // Only allow reviews for delivered orders
    });

    if (!hasPurchased) {
      return res.status(403).json({
        success: false,
        message: "You can only review products you have purchased",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
