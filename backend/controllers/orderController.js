import { Order } from "../models/orderModel.js";
import { nanoid } from "nanoid";
import { Product } from "../models/productModel.js";
import { notify } from "../services/notificationService.js";
import { populateUserOrders, getOrderSummary } from "../utils/helpers.js";
import { User } from "../models/userModel.js";


//create order
export const createOrder = async (req, res) => {
    try {
        const { customerDetails, orderItems, paymentMethod, shippingFee } = req.body;
        const {userId} = req.user

        //validate required fields
        if (!userId || !orderItems || !orderItems.length) {
            return res.status(400).json({
                success: false,
                message: "User ID and at least one order item are required"
            })
        }

        //calculate order totals
        const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalAmount = subtotal + shippingFee;

        //create new order
        const order = new Order({
            orderId: `ord_${nanoid(8)}`,
            userId,
            customerDetails,
            orderItems,
            subtotal,
            shippingFee,
            totalAmount,
            paymentStatus: "pending",
            orderStatus: "Processing",
            statusHistory: [{
                status: "Processing",
                changedBy: req.user?.userId || 'system',
                note: "Order created"
            }],
            paymentDetails: {
                currency: "NGN",
            }
        })

        //save order
        const savedOrder = await order.save();
        const user = await User.findOne({ userId: userId })
        await  user.addOrder(savedOrder.orderId)

        user.cart = []
        await user.save()

        await updateProductStocks(orderItems);


        try {
        await notify.newOrder(savedOrder);
        } catch (error) {
            console.error("Notification failed", error); 
        }

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: savedOrder
        })
    } catch (error) {
        handleOrderError(res, error, "creating order");
    }
};


//get all orders admin
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find();
      res.status(200).json({
          success: true,
          orders
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
        const user = await User.findOne({ userId: req.user.userId })
        if (!user) {
            return res.status(404).json({success: false, message: "User not found"})
        }

        const populatedOrders = await populateUserOrders(user.orders)
        const summary = getOrderSummary(populatedOrders)

        res.status(200).json({success: true, orders: populatedOrders, summary})
    } catch (error) {
        handleOrderError(res, error, "fetching orders");
    }
};

//delete order
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({ orderId })
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        const nonDeletableStatuses = ["Shipped", "Out_for_delivery", "Delivered"];
        if (nonDeletableStatuses.includes(order.orderStatus)) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete order with status "${order.orderStatus}"`,
                allowedStatuses: ["Processing", "Pending", "Cancelled", ]
            })
        }

        if (order.orderStatus === "Cancelled") {
            await restoreProductStocks(order.orderItems)
        }

        const deletedOrder = await Order.findOneAndDelete({ orderId });

        res.json({
            success: true,
            message: "Order deleted successfully",
            order: deletedOrder,
            restoredStock: order.orderStatus !== "Cancelled"
     })
        
    } catch (error) {
        handleOrderError(res, error, "deleting order")
    }
}

//get single order
export const getOrder = async (req, res) => {
    try {
        const { orderId } = req.params
        
        //verify user owns this order
        const user = await User.findOne({ userId: req.user.userId })
        if (!user) {
            return res.status(404).json({success: false, message: "User not found"})
        }
        const userOwnsOrder = user.orders.some(order => order.orderId === orderId)

        if (!userOwnsOrder) {
            return res.status(403).json({success: false, message: 'Order not found for this user'})
        }

        const order = await Order.findOne({ orderId })
        if (!order) {
            return res.status(404).json({success: false, message: "Order not found"})
        }
        res.status(200).json({success: true, order})
       
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
                message: "Order status is required"
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
                message: "Invalid order status"
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
                message: "Order not found"
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
            message: 'Order status updated successfully',
            order
        })
    } catch (error) {
        handleOrderError(res, error, "updating order status")
    }
}

//cancel order 
export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { reason } = req.body;

        // verify user owns this order
        const user = await User.findOne({ userId: req.user.userId })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found"})
        }

         const userOwnsOrder = user.orders.some(
           (order) => order.orderId === orderId
         );

         if (!userOwnsOrder) {
           return res
             .status(403)
             .json({
               success: false,
               message: "Order not found for this user",
             });
         }

        const order = await Order.findOne({ orderId })
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        if (!["Processing", "Pending"].includes(order.orderStatus)) {
            return res.status(400).json({
                success: false,
                message: `Order cannot be cancelled in its current state (${order.orderStatus})`
            });
        }

        order.orderStatus = "Cancelled";
        order.statusHistory.push({
            status: "Cancelled",
            changedAt: new Date(),
            changedBy: req.user?.userId || "customer",
            note: reason || 'Cancelled by customer'
        });

        await order.save();

        await restoreProductStocks(order.orderItems);

        res.json({
            success: true,
            message: "Order cancelled successfully",
            order
        })
    } catch (error) {
        handleOrderError(res, error, "cancelling order");
    }
}


//initialize paystack payment
export const inittializePayment = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({ orderId })
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        const payload = {
            email: order.customerDetails.email,
            amount: order.totalAmount * 100, //paystack expects kobo
            reference: order.orderId,
            metadata: {
                orderId: order.orderId,
                userId: order.userId.toString()
            },
            callback_url: `${process.env.FRONTEND_URL}/order/verify/${order.orderId}`
        };

        res.json({
            success: true,
            message: "Paystack intergration placeholder",
            paymentData: payload,
            paymentUrl: `${process.env.PAYSTACK_URL}/pay/${order.orderId}`
        })
    } catch (error) {
        handleOrderError(res, error, "initializing payment")
    }
}

//verify payment
export const verifyPayment = async (req, res) => {
    try {
        const { reference } = req.params;

        //placejolder - actual implementation will verify with paystack api
        const order = await Order.findOne({ orderId: reference });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        //simulate payment verification
        order.paymentStatus = "paid";
        order.paymentDetails = {
            transactionId: `txn_${nanoid(16)}`,
            paymentDate: new Date(),
            paymentGateway: "paystack",
            gatewayResponse: {simulated: true}
        }

        order.statusHistory.push({
            status: "paid",
            changedBy: "paystack",
            note: "Payment verified successfully"
        })

        await order.save();

        //in production, paystack will hit this endpoint directly
        if (process.env.NODE_ENV === "development") {
            res.json({
                success: true,
                message: "Payment verification simulated",
                order
            })
        } else {
            res.sendStatus(200)
        }
    } catch (error) {
        handleOrderError(res, error, "verifying payment")
    }
}

//helper functions
async function updateProductStocks(orderItems) {
    for (const item of orderItems) {
        await Product.findByIdAndUpdate(
            item.productId,
            { $inc: { stock: -item.quantity } }
        );
    }
}

async function restoreProductStocks(orderItems) {
    for (const item of orderItems) {
        await Product.findByIdAndUpdate(
            item.productId,
            { $inc: { stock: item.quantity}}
        )
    }
}

function handleOrderError(res, error, action) {
    console.error(`Error while ${action}:`, error);

    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: Object.values(error.errors).reduce((acc, { path, message }) => ({
                ...acc,
                [path]: message
            }), {})
        })
    }

    res.status(500).json({
        success: false,
        message: `Server error while ${action}`,
        error: process.env.NODE_ENV === 'development' ? {
            message: error.message,
            stack: error.stack
        } : undefined
    })
    
}