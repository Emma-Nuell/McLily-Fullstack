import express from "express"
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js"
import { login, protectedRoute, logout } from "../controllers/adminController.js"
import { updateOrderStatus, getAllOrdersAdmin, deleteOrder } from "../controllers/orderController.js"
import { deleteNotification, markAsRead, getNotifications, markAllAsRead } from "../controllers/notificationController.js"
import {
  addProduct,
  deleteProduct,
  getAllProducts,
    editProduct,
  toggleFeatured,
  updateProductStockPrice,
} from "../controllers/productController.js";
import { createPhysicalOrder, getPhysicalOrder, getPhysicalOrders, updatePhysicalOrderPayment } from "../controllers/physicalController.js";
const router = express.Router()


router.post("/login", login)
router.use(verifyAdmin)
router.get("/verify", verifyToken, protectedRoute)
router.post("/logout", verifyToken, logout)
router.patch("/orders/:orderId/status", updateOrderStatus);
router.delete("/orders/:orderId", deleteOrder);
router.get("/orders", getAllOrdersAdmin);
router.get("/notifications", getNotifications);
router.patch("/notifications/:id/read", markAsRead)
router.delete("/notifications/:id", deleteNotification)
router.patch("/notifications/mark-all-as-read", markAllAsRead);
router.get("/products", getAllProducts)
router.post("/products", addProduct)
router.patch("/products/:id", editProduct)
router.delete("/products/:id", deleteProduct)
router.patch("/products/:id/featured", toggleFeatured)
router.patch("/products/:productId/stock-price", updateProductStockPrice);
router.post("/physical", createPhysicalOrder);
router.patch("/physical/:orderId/payment", updatePhysicalOrderPayment);
router.get("/physical", getPhysicalOrders);
router.get("/physical/:orderId", getPhysicalOrder);



export default router