import express from "express"
import { allUsers, deleteUser, login, signup, changePassword, forgotPassword, resetPassword } from "../controllers/accountController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { authLimiter } from "../middlewares/rateLimiter.js"
const router = express.Router()

router.post("/signup", authLimiter, signup)
router.post("/login", authLimiter, login)
router.post("/deleteUser", deleteUser)
router.get("/allUsers", allUsers)
router.post("/forgot", forgotPassword)
router.post("/reset", resetPassword)

// router.use(verifyToken)
router.post("/change", changePassword)

export default router