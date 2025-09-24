import express from "express"
import { verifyTokenUser } from "../middlewares/authMiddleware.js"
import { addToCart, addToWishlist, canReview, checkWishlist, clearCart, getCart, getUserWishlist, mergeCart, removeFromCart, removeFromWishlist, updateCart, userAllReviews, userPendingReviews, userReviews} from "../controllers/userController.js"
const router = express.Router()

router.use(verifyTokenUser)
router.get("/cart", getCart)
router.post("/cart/add", addToCart)
router.delete("/cart/remove", removeFromCart)
router.patch("/cart/update", updateCart)
router.delete("/cart/clear", clearCart)
router.post("/cart/sync", mergeCart)
router.get("/wishlist", getUserWishlist)
router.post("/wishlist/add", addToWishlist)
router.delete("/wishlist/remove/:productId", removeFromWishlist)
router.get("/wishlist/check/:productId", checkWishlist)
router.get("/reviews/can-review/:productId", canReview)
router.get("/reviews/pending", userPendingReviews)
router.get("/reviews/my-reviews", userReviews)
router.get("/reviews/all-reviews", userAllReviews)

export default router