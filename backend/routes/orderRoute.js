import express from "express";
import { verifyTokenUser } from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrders,  getOrder, updateOrderStatus, cancelOrder, inittializePayment, verifyPayment } from "../controllers/orderController.js";

const router = express.Router()


router.post("/verify-payment", verifyPayment);
router.use(verifyTokenUser)
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:orderId", getOrder);
router.patch("/:orderId", updateOrderStatus);
router.post("/:orderId/cancel", cancelOrder);
router.post("/:orderId/pay", inittializePayment)

export default router;


