import User from "../models/userModel.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()

const secret_key = process.env.JWT_SECRET; 

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
           return res.status(400).json({message: "All fields must be filled"})
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({message: "Email already in use"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            userId: nanoid(10),
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(201).json({message: "User created successfully"})
    } catch (error) {
        res.status(401).json({message: "Server error", details: error.message})
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body
try {
    if (!email || !password) {
       return res.status(400).json({message: "Email and password are required"})
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({message: "Invalid email or password"})
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password)
    if (!isPasswordvalid) {
        return res.status(400).json({message: "Invalid email or password"})
    }
    const token = jwt.sign({ id: user.userId, email: user.email }, secret_key, { expiresIn: "7d" })
    
    res.status(200).json({user, token, message: "Login succesful"})
} catch (error) {
    res.status(400).json({message: "Server error", details: error.message})
}

};

export const deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({userId: req.body.id})
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        res.status(400).json({message: "Server error", details: error.message})
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({message: "Server error", details: error.message})
    }
}