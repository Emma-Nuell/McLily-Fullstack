import express from "express"
import { allUsers, deleteUser, login, signup } from "../controllers/accountController.js"
const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/deleteUser", deleteUser)
router.get("/allUsers", allUsers)

export default router