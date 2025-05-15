import { Product } from "../models/productModel.js";
import { nanoid } from "nanoid";

//add new product
export const addProduct = async (req, res) => {
  try {
    const generatedId = nanoid(8);

 c
    console.log(product);
    await product.save();
    console.log("saved");
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding product", error: error.message });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ productId: req.body.id });
    res.json({ success: 1, message: "Product removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing product", error: error.message });
  }
};

//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

//get single product
export const getSingleProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({ productId: productId });

    if (!product) {
      return res.status(401).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

export const getSingleProductName = async (req, res) => {
  const productName = req.params.name;

  try {
    const product = await Product.findOne({ name: productName });

    if (!product) {
      return res.status(401).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

//edit a product
export const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: updates },
      { new: true }
    );

    if (!product) {
      return res.status(401).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product upadated successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured", details: error.message });
  }
};

// submit a review
export const submitReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const { userId, comment, rating } = req.body;

    if (!userId || !rating) {
      return res
        .status(400)
        .json({ message: "UserId and rating are required" });
    }
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(401).json({ message: "Product not found" });
    }
    const existingReview = product.reviews.find((r) => r.userId === userId);
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "User has already reviewed this product" });
    }

    const newReview = {
      userId,
      comment: comment || null,
      rating,
      date: new Date().toISOString().split("T")[0],
    };

    product.reviews.push(newReview);

    const currentReviews = product.rating.reviews;
    const currentAverage = product.rating.average;

    const updatedReviews = currentReviews + 1;
    const updatedAverage =
      (currentAverage * currentReviews + rating) / updatedReviews;

    product.rating.reviews = updatedReviews;
    product.rating.average = parseFloat(updatedAverage.toFixed(1));

    await product.save();

    res.status(200).json({
      message: "Review submitted successfully",
      product: {
        reviews: product.reviews,
        rating: product.rating,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured", details: error.message });
  }
};
