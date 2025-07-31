import { Product } from "../models/productModel.js";
import { PhysicalOrder } from "../models/physicalSale.js";

export const createPhysicalOrder = async (req, res) => {
  try {
    const { customer, items, paymentType, paymentMethod, amountPaid, notes } =
      req.body;

    // Calculate totals
    let totalAmount = 0;
    const orderItems = [];

    // Process each item and update product stock
    for (const item of items) {
      const product = await Product.findOne({ productId: item.productId });
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product ${item.productId} not found` });
      }

      // Update stock based on size or general stock
      if (product.sizes && product.sizes.length > 0) {
        const sizeIndex = product.sizes.findIndex(
          (s) => s.form === item.size.form && s.value === item.size.value
        );
        if (
          sizeIndex === -1 ||
          product.sizes[sizeIndex].stock < item.quantity
        ) {
          return res
            .status(400)
            .json({ error: `Insufficient stock for size ${item.size.value}` });
        }
        product.sizes[sizeIndex].stock -= item.quantity;
      } else {
        if (product.stock < item.quantity) {
          return res.status(400).json({ error: "Insufficient stock" });
        }
        product.stock -= item.quantity;
      }

      // Update product sales count
      product.sales += item.quantity;

      await product.save();

      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product.productId,
        name: product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      });
    }

    const amountRemaining = totalAmount - amountPaid;

    const order = new PhysicalOrder({
      orderId: `PHYS-${Date.now()}`,
      customer,
      items: orderItems,
      totalAmount,
      amountPaid,
      amountRemaining,
      paymentType,
      paymentMethod,
      status: amountRemaining > 0 ? "partially_paid" : "completed",
      notes,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update payment for a physical order
export const updatePhysicalOrderPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { amount } = req.body;

    const order = await PhysicalOrder.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const paymentAmount = parseFloat(amount);
    if (paymentAmount <= 0) {
      return res
        .status(400)
        .json({ error: "Payment amount must be greater than 0" });
    }

    if (paymentAmount > order.amountRemaining) {
      return res
        .status(400)
        .json({ error: "Payment amount exceeds remaining balance" });
    }

    // Add to payment history
    order.paymentHistory.push({
      amount: paymentAmount,
      method,
      notes,
    });

    order.amountPaid += amount;
    order.amountRemaining = order.totalAmount - order.amountPaid;

    if (order.amountRemaining <= 0) {
      order.status = "completed";
    } else {
      order.status = "partially_paid";
    }

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all physical orders
export const getPhysicalOrders = async (req, res) => {
  try {
    const orders = await PhysicalOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single physical order
export const getPhysicalOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await PhysicalOrder.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
