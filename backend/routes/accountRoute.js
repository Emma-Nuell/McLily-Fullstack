import express from "express"
import { allUsers, deleteUser, login, signup, changePassword, forgotPassword, resetPassword, getProfile, updateProfile, getAllAddresses, addNewAddress, updateAddress, deleteAddress, setDefaultAddress } from "../controllers/accountController.js"
import { verifyTokenUser } from "../middlewares/authMiddleware.js"
import { authLimiter } from "../middlewares/rateLimiter.js"
const router = express.Router()

router.post("/signup", authLimiter, signup)
router.post("/login", authLimiter, login)
router.get("/users/allUsers", allUsers)
router.delete("/users/delete/:userId", deleteUser)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.use(verifyTokenUser)
router.patch("/change-password", changePassword)
router.get("/profile", getProfile)
router.patch("/update", updateProfile)
router.get("/addresses", getAllAddresses)
router.post("/addresses/new", addNewAddress)
router.put("/addresses/update/:addressId", updateAddress)
router.delete("/addresses/delete/:addressId", deleteAddress)
router.patch("/addresses/default/:addressId", setDefaultAddress)


export default router