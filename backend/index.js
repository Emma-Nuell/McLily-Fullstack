import express from "express";
import http from "http"
import cors from "cors";
import dotenv from "dotenv";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import accountRoute from "./routes/accountRoute.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js"
import storeRoute from "./routes/storeRoute.js"
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorhandler.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import {Server} from "socket.io"

export const app = express();
const server = http.createServer(app)
dotenv.config();

const port = process.env.PORT || 4000; 

if (!process.env.FRONTEND_URL) {
  console.error("Missing FRONTEND_URL in .env");
  process.exit(1);
}

//middleware
// app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);
app.use(apiLimiter)
app.use(express.json()); 
app.use(cors());
app.use(logger); 


//api creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});


app.set("io", io)



connectDB()


//routes
app.use("/account", accountRoute)
app.use("/product", productRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/order", orderRoute)
app.use("/store", storeRoute)


app.use(errorHandler);

server.listen(port, (error) => {
  if (!error) {
    console.log("server is running on port", port);
    console.log(`WebSocket ready on ws://localhost:${port}`);
  } else {
    console.log("Error :", error);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  app.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log(`Uncaught Exception: ${error.message}`);
  app.close(() => process.exit(1));
});
