import express from "express";
import { verifyTokenUser } from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrders,  getOrder, updateOrderStatus, cancelOrder, verifyPayment, paystackWebhook, deleteOrder } from "../controllers/orderController.js";

const router = express.Router()


router.use(verifyTokenUser)
router.post("/orders/new", createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/paystack-webhook", paystackWebhook);
router.get("/orders", getAllOrders);
router.delete("/orders/delete/:orderId", deleteOrder);
router.get("/orders/:orderId", getOrder);
router.patch("/orders/status/:orderId", updateOrderStatus);
router.patch("/orders/cancel/:orderId", cancelOrder);


export default router;


