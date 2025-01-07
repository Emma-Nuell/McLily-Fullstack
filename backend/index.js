import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import { nanoid } from "nanoid";

const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

//Database connection with mongodb
mongoose
  .connect(
    "mongodb+srv://emma:emma%40123@cluster0.rspy6.mongodb.net/mclily?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

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

//schema
const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sizes: {
    type: [
      {
        size: String,
        stock: Number,
      },
    ],
    default: null,
  },
  specifications: {
    type: Map, // This allows you to store key-value pairs dynamically
    of: String, // Values must be strings, but you can adjust this as needed
    default: null, // Default to an empty object if not provided
  },
  reviews: {
    type: [
      {
        userId: String,
        comment: String,
        rating: Number,
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  featured: {
    type: Boolean,
    default: null,
  },
  rating: {
    average: {
      type: Number,
      default: 0, // Default rating average
    },
    reviews: {
      type: Number,
      default: 0, // Default number of reviews
    },
  },
});

const Product = mongoose.model("Product", ProductSchema);

app.post("/addproduct", async (req, res) => {
  try {
    const generatedId = nanoid(8);

    const product = new Product({
      id: generatedId,
      name: req.body.name,
      images: req.body.images,
      category: req.body.category,
      subCategory: req.body.subCategory,
      price: req.body.price,
      description: req.body.description,
      tags: req.body.tags,
      brand: req.body.brand,
      stock: req.body.stock,
      sizes: req.body.sizes || null,
      specifications: req.body.specifications || null,
      reviews: req.body.reviews || [],
      featured: req.body.featured || null,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding product", error: error.message });
  }
});

//api to delete product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    sucess: 1,
    message: "Product removed successfully",
  });
});

//api for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("all products fetched");
  res.send(products);
});

//api to get fetch single product
app.post("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(401).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

//api to edit product
app.patch("/editproduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: updates },
      { new: true }
      );
      
      if (!product) {
        return  res.status(401).json({message: "Product not found"})
      }
      res.status(200).json({message: "Product upadated successfully", product})
  } catch (error) {
      res.status(500).json({message: "An error occured", details: error.message})
  }
});

//api to submit review
app.post("/product/:id/review", async (req, res) => {
    try {
        const productId = req.params.id
        const { userId, comment, rating } = req.body
        
        if (!userId || !rating) {
          return  res.status(400).json({message: "UserId and rating are required"})
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({message: "Rating must be between 1 and 5"})
        }

        const product = await Product.findById(productId)

        if (!product) {
          return  res.status(401).json({message: "Product not found"})
        }
        const existingReview = product.reviews.find(r => r.userId === userId)
        if (existingReview) {
          return  res.status(400).json({message: "User has already reviewed this product"})
        }

        const newReview = {
            userId,
            comment: comment || null,
            rating,
            date: new Date().toISOString().split("T")[0]
        }

        product.reviews.push(newReview)

        const currentReviews = product.rating.reviews
        const currentAverage = product.rating.average

        const updatedReviews = currentReviews + 1
        const updatedAverage = (currentAverage * currentReviews + rating) / updatedReviews

        product.rating.reviews = updatedReviews
        product.rating.average = parseFloat(updatedAverage.toFixed(1))

        await product.save()

        res.status(200).json({
            message: "Review submitted successfully",
            product: {
                reviews: product.reviews,
                rating: product.rating
            }
        })


    } catch (error) {
        res.status(500).json({message: "An error occured", details: error.message})
    }
})

app.listen(port, (error) => {
  if (!error) {
    console.log("server is running on port", port);
  } else {
    console.log("Error :", error);
  }
});
