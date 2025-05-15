import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import productRoute from "./routes/productRoute.js";
import accountRoute from "./routes/accountRoute.js";
import userRoute from "./routes/userRoute.js";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorhandler.js";

const port = 4000;
export const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(logger);

//api creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

//image storage
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//upload endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

dotenv.config()
connectDB()


//routes
app.use("/account", accountRoute)
app.use("/products", productRoute)
app.use("/cart", userRoute)


app.use(errorHandler);

app.listen(port, (error) => {
  if (!error) {
    console.log("server is running on port", port);
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
