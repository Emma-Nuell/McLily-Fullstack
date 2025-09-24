import { Order } from "../models/orderModel.js";
import { nanoid } from "nanoid";
import { Product } from "../models/productModel.js";
import { notify } from "../services/notificationService.js";
import {
  populateUserOrders,
  getOrderSummary,
  verifyPaystackPayment,
  updateProductStocks,
  handleOrderError,
  restoreProductStocks,
  restoreStocksByOrderId,
} from "../utils/helpers.js";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";
import { sendConfirmationEmail } from "../utils/emailServices/sendOrderConfirmed.js";

//create order
export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      customerDetails,
      orderItems,
      paymentMethod,
      shippingFee,
      deliveryMethod,
      pickupStation,
      pickupAddress,
    } = req.body;
    const userId = req.user.userId;

    // Validate required fields
    if (!userId || !orderItems || !orderItems.length || !paymentMethod) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "User ID, order items, and payment method are required",
      });
    }

    // Validate payment method
    const validPaymentMethods = [
      "bank_transfer",
      "cash_on_delivery",
      "paystack",
    ];
    if (!validPaymentMethods.includes(paymentMethod)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // Calculate order totals
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalAmount = subtotal + (shippingFee || 0);

    // Create order ID
    const orderId = `ORD_${nanoid(8)}`;

    //estimated delivery = 10 days from now
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 10);

    // Create new order
    const order = new Order({
      orderId,
      userId,
      customerDetails,
      orderItems,
      itemCount: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shippingFee: shippingFee || 0,
      totalAmount,
      deliveryMethod,
      paymentMethod,
      pickupStation: pickupStation || "none",
      pickupAddress: pickupAddress || "none",
      paymentStatus: ["cash_on_delivery", "bank_transfer"].includes(
        paymentMethod
      )
        ? "pending"
        : "pending",
      orderStatus: "Processing",
      statusHistory: [
        {
          status: "Processing",
          changedBy: userId,
          note: "Order created",
        },
      ],
      deliveryTracking: {
        trackingNumber: `trk_${nanoid(10)}`,
        carrier: "Not Assigned",
        estimatedDelivery,
        actualDelivery: null, 
      },
    });

    // Save order
    const savedOrder = await order.save({ session });
    if(paymentMethod === "cash_on_delivery" || paymentMethod === "bank_transfer") {
      // Update user - add to orders and clear cart
      const user = await User.findOne({ userId }).session(session);
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.orders.push({ orderId: savedOrder.orderId, orderedAt: new Date() });
      user.cart = [];
      await user.save({ session });

      // Update product stocks
      await updateProductStocks(orderItems, session);
      await sendConfirmationEmail(savedOrder);
    }



    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Send notifications
    try {
      await notify.newOrder(savedOrder);
    } catch (error) {
      console.error("Notification failed", error);
    }

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
      requiresPayment: paymentMethod !== "cash_on_delivery",
    });
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    handleOrderError(res, error, "creating order");
  }
};

// Enhanced payment verification endpoint
export const verifyPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { reference, orderId } = req.body;

    // Find order
    const order = await Order.findOne({ orderId: orderId }).session(session);
    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Verify payment with Paystack
    const verificationResult = await verifyPaystackPayment(reference);

    if (!verificationResult.success) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: verificationResult.message,
        order,
      });
    }

    // Update order payment status
    order.paymentStatus = "paid";
    order.paymentDetails = {
      transactionId: reference,
      paymentDate: new Date(),
      paymentGateway: "paystack",
      currency: "NGN",
      gatewayResponse: verificationResult.data,
    };

    order.statusHistory.push({
      status: "paid",
      changedBy: "paystack",
      note: "Payment verified successfully",
      changeAt: new Date(),
    });

    // If payment is successful, update user cart and product stocks
      const user = await User.findOne({ userId: req.user.userId }).session(session);
        if (!user) {
          await session.abortTransaction();
          session.endSession();
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
      user.orders.push({ orderId: order.orderId, orderedAt: new Date() });
      user.cart = [];
      await user.save({ session });

      await updateProductStocks(order.orderItems, session);
   

    await order.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    await sendConfirmationEmail(order)

    // Send payment confirmation notification
    try {
      await notify.paymentProcessed(order);
    } catch (error) {
      console.error("Payment confirmation notification failed", error);
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    handleOrderError(res, error, "verifying payment");
  }
};

// Webhook endpoint for Paystack to call
export const paystackWebhook = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Verify this is a legitimate Paystack webhook
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');
    
    if (hash !== req.headers['x-paystack-signature']) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).send('Invalid signature');
    }

    const event = req.body;
    
    // Handle different webhook events
    if (event.event === 'charge.success') {
      const { reference, amount, customer, id: transactionId } = event.data;
      
      // Find and update order
      const order = await Order.findOne({ orderId: reference }).session(session);
      if (order && order.paymentStatus !== "paid") {
        order.paymentStatus = "paid";
        order.paymentDetails = {
          transactionId,
          paymentDate: new Date(),
          paymentGateway: "paystack",
          currency: "NGN",
          gatewayResponse: event.data,
        };

        order.statusHistory.push({
          status: "paid",
          changedBy: "paystack",
          note: "Payment completed via webhook",
          changeAt: new Date(),
        });

        // Update user and clear cart
        const user = await User.findOne({ userId: order.user.userId }).session(
          session
        );
        if (user) {
          user.orders.push({ orderId: order.orderId, orderedAt: new Date() });

          // Find and remove items from cart that are in this order
          user.cart = user.cart.filter(
            (cartItem) =>
              !order.orderItems.some(
                (orderItem) => orderItem.productId === cartItem.productId
              )
          );

          await user.save({ session });
        }

        // Update product stocks
        await updateProductStocks(order.orderItems, session);

        await order.save({ session });

        // Send confirmation
        try {
          await notify.paymentConfirmed(order);
        } catch (error) {
          console.error("Webhook notification failed", error);
        }
      }
    }

    await session.commitTransaction();
    session.endSession();
    res.sendStatus(200);

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Webhook error:", error);
    res.status(500).send('Webhook processing failed');
  }
};


//get all orders admin
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

//get all orders user
export const getAllOrders = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const populatedOrders = await populateUserOrders(user.orders);
    const summary = getOrderSummary(populatedOrders);

    res.status(200).json({ success: true, orders: populatedOrders, summary });
  } catch (error) {
    handleOrderError(res, error, "fetching orders");
  }
};

// get all orders user backup with pagination
export const getAllOrdersUser = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find({ userId: req.user.userId })
      .sort({ orderedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Order.countDocuments({ userId: req.user.userId });

    res.status(200).json({
      success: true,
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete order
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const nonDeletableStatuses = ["Shipped", "Out_for_delivery", "Delivered"];
    if (nonDeletableStatuses.includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete order with status "${order.orderStatus}"`,
        allowedStatuses: ["Processing", "Pending", "Cancelled"],
      });
    }

    if (order.orderStatus === "Cancelled") {
      await restoreProductStocks(order.orderItems);
    }

    const deletedOrder = await Order.findOneAndDelete({ orderId });

    res.json({
      success: true,
      message: "Order deleted successfully",
      order: deletedOrder,
      restoredStock: order.orderStatus !== "Cancelled",
    });
  } catch (error) {
    handleOrderError(res, error, "deleting order");
  }
};

//get single order
export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    //verify user owns this order
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const userOwnsOrder = user.orders.some(
      (order) => order.orderId === orderId
    );

    if (!userOwnsOrder) {
      return res
        .status(403)
        .json({ success: false, message: "Order not found for this user" });
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    handleOrderError(res, error, "fetching order");
  }
};

//update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Order status is required",
      });
    }

    const validStatuses = [
      "Processing",
      "Pending",
      "Shipped",
      "Out_for_delivery",
      "Delivered",
      "Cancelled",
      "Returned",
      "Refunded",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { orderStatus: status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status,
      changedAt: new Date(),
      changedBy: req.user?.userId || "system",
    });
    await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    handleOrderError(res, error, "updating order status");
  }
};

//cancel order
export const cancelOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  try {
    const { orderId } = req.params;
    const { reason } = req.body;

    // Find the order
    const order = await Order.findOne({ orderId, userId: req.userId }).session(
      session
    );

    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Check if order can be cancelled
    const cancellableStatuses = ["pending", "processing"];
    if (!cancellableStatuses.includes(order.orderStatus)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled in current status: ${order.orderStatus}`,
      });
    }

    // Restore product stocks
    const restoreResults = await restoreProductStocks(
      order.orderItems,
      session
    );

    if (restoreResults.failed.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({
        success: false,
        message: "Failed to restore product stocks",
        details: restoreResults,
      });
    }

    // Update order status
    order.orderStatus = "cancelled";
    order.statusHistory.push({
      status: "cancelled",
      changedBy: req.userId,
      note: reason || "Cancelled by customer",
      changeAt: new Date(),
    });

    await order.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Send cancellation notification
    try {
      await notify.orderCancelled(order, restoreResults);
    } catch (error) {
      console.error("Cancellation notification failed:", error);
    }

    res.json({
      success: true,
      message: "Order cancelled successfully",
      order,
      stockRestoration: restoreResults,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    handleOrderError(res, error, "cancelling order");
  }
};

export const refundOrderAdmin =  async (req, res)  => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { orderId } = req.params;
      const { reason } = req.body;

      const order = await Order.findOne({ orderId }).session(session);

      if (!order) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }

      // Restore product stocks
      const restoreResults = await restoreProductStocks(
        order.orderItems,
        session
      );

      if (restoreResults.failed.length > 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
          success: false,
          message: "Failed to restore product stocks",
          details: restoreResults,
        });
      }

      // Update order status
      order.orderStatus = "refunded";
      order.paymentStatus = "refunded";
      order.statusHistory.push({
        status: "refunded",
        changedBy: req.userId,
        note: reason || "Order refunded",
        changeAt: new Date(),
      });

      await order.save({ session });

      // Commit transaction
      await session.commitTransaction();
      session.endSession();

      // Send refund notification
      try {
        await notify.orderRefunded(order, restoreResults);
      } catch (error) {
        console.error("Refund notification failed:", error);
      }

      res.json({
        success: true,
        message: "Order refunded successfully",
        order,
        stockRestoration: restoreResults,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      handleOrderError(res, error, "refunding order");
    }
} 



export const restoreOrdersBulkAdmin =  async (req, res)  => {
try {
  const { orderIds } = req.body;

  if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Array of order IDs is required",
    });
  }

  const results = {
    successful: [],
    failed: [],
  };

  for (const orderId of orderIds) {
    try {
      const result = await restoreStocksByOrderId(orderId);
      results.successful.push({
        orderId,
        result,
      });
    } catch (error) {
      results.failed.push({
        orderId,
        error: error.message,
      });
    }
  }

  res.json({
    success: results.failed.length === 0,
    message: `Processed ${orderIds.length} orders`,
    results,
  });
} catch (error) {
  handleOrderError(res, error, "processing bulk stock restoration");
}
} 
