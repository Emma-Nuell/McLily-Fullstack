import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  submitReview,
  editProduct,
} from "../controllers/productController.js";

const router = express.Router()

router.post("/addproduct", addProduct);
router.post("/removeproduct", deleteProduct);
router.get("/allproducts", getAllProducts);
router.get("/product/:id", getSingleProduct);
router.patch("/editproduct/:id", editProduct);
router.post("/product/:id/review", submitReview);

export default router
