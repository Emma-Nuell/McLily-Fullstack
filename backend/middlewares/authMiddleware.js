import jwt from "jsonwebtoken"
import  {Admin } from "../models/adminModel.js"

const secret_key = process.env.JWT_SECRET

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      })
    }
    try {
        const decoded = jwt.verify(token, secret_key) 
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
         }
        next()
    } catch (error) {
      let message = "Invalid token";
      let statusCode = 403;

      if (error instanceof jwt.TokenExpiredError) {
        message = "Token expired";
        statusCode = 401;
      } else if (error instanceof jwt.JsonWebTokenError) {
        message = "Malfomed token";
      }

      console.error("Token verification failed:", error.message);
      res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' &&{debug: error.message})
      })
      
         
    }
}

export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Admin authentication required"
      })
    }

    const decoded = jwt.verify(token, secret_key);

    const admin = await Admin.findOne({
      _id: decoded.id,
      isActive: true
    }).select("-password")

    if (!admin) {
      return res.status(403).json({
        success: false,
        error: "Admin account not found or inactive"
      })
    }

    req.admin = admin;
    req.token = token;
    next();


  } catch (error) {
    console.error("Admin verification error:", error);
    res.status(401).json({
      success: false,
      error: "Please authenticate as admin"
    })
    
  }
}

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.admin?.role || req.admin.role !== role) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Requires ${role} role`,
      });
    }
    next();
  };
}