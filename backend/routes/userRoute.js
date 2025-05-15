import express from "express"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { getCart, mergeCart} from "../controllers/userController.js"
const router = express.Router()

router.use(verifyToken)
router.get("/userCart", getCart)
router.post("/mergeCart", mergeCart)

export default router