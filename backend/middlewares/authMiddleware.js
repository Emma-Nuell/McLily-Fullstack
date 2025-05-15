import jwt from "jsonwebtoken"

const secret_key = process.env.JWT_SECRET

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return  req.status(401).json({message: "No token provided"})
    }
    try {
        const id = jwt.verify(token, secret_key) 
         req.user = user
        next()
    } catch (error) {
         res.status(403).json({message: "Invalid token"})
    }
}