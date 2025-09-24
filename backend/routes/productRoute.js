import express from "express";
import {
  submitReview,
  updateReview,
  deleteReview,
  trackVisits,
} from "../controllers/productController.js";
import { verifyTokenUser } from "../middlewares/authMiddleware.js";
import { checkPurchase } from "../middlewares/purchaseMiddleware.js";

const router = express.Router()

router.post("/track-visit", trackVisits);
router.use(verifyTokenUser)
router.post("/reviews/submit",checkPurchase, submitReview);
router.put("/reviews/update/:productId", updateReview);
router.delete("/reviews/delete/:productId", deleteReview);

export default router
