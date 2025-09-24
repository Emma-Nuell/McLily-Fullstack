import express from "express"
import { verifyTokenUser } from "../middlewares/authMiddleware.js"
import { getSingleProduct } from "../controllers/productController.js";
import { getCategoryFilters, getCategoryProducts, getHomepage, getRecommended, getSearchProducts, getSearchSuggestions } from "../controllers/storeController.js";

const router = express.Router()

router.get("/products/:productId", getSingleProduct);
router.post("/homepage", getHomepage);
router.post("/recommended", getRecommended);
router.get("/filtered-products", getCategoryProducts);
router.get("/filter-options", getCategoryFilters);
router.get("/search/suggestions", getSearchSuggestions);
router.get("/search/results", getSearchProducts);


export default router