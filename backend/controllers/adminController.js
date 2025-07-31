import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Admin} from "../models/adminModel.js";
import dotenv from "dotenv";
dotenv.config()


const secret_key = process.env.JWT_SECRET; 

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
      if (!admin) return res.status(401).json({
          success: false,
          error: "Invalid credentials"
      });

    const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(401).json({
          success: false,
          error: "Invalid credentials"
      });

      admin.lastLogin = new Date();
      await admin.save();

    const token = jwt.sign({ id: admin._id, role: admin.role }, secret_key, {
      expiresIn: "7d",
    });

      res.json({
        success: true,
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
    });
  } catch (error) {
      res.status(500).json({
          success: false,
          error: error.message
      });
  }
};

export const getAdminProfile = async (req, res) => {
    try {
        res.json({
            success: true,
            admin: req.admin
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const protectedRoute = async (req, res) => {
  try {
     res.json({ valid: true });
  } catch (error) {
    res.status(401).json({valid: false})
  }
  
};

export const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
