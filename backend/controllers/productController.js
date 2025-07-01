import { Product } from "../models/productModel.js";
import { nanoid } from "nanoid";

//add new product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      images,
      category,
      subCategory,
      price,
      description,
      tags,
      brand,
      stock,
      sizes,
      specifications,
      featured
    } = req.body;

    // 1. Enhanced Input Validation
    const requiredFields = {
      name: 'Product name',
      images: 'Product images',
      category: 'Category',
      subCategory: 'Sub-category',
      price: 'Price',
      description: 'Description',
      brand: 'Brand',
      stock: 'Stock quantity'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([field]) => !req.body[field])
      .map(([_, message]) => message);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: missingFields.reduce((acc, field) => ({
          ...acc,
          [field.toLowerCase().replace(/\s+/g, '_')]: `${field} is required`
        }), {})
      });
    }

    // 2. Type Conversion and Validation
    const numericPrice = parseFloat(price);
    const numericStock = parseInt(stock);

    if (isNaN(numericPrice)) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: { price: "Price must be a valid number" }
      });
    }

    if (isNaN(numericStock)) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: { stock: "Stock must be a valid integer" }
      });
    }

    // 3. Validate images array
    if (!Array.isArray(images)) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: { images: "Images must be provided as an array" }
      });
    }

    // 4. Validate sizes structure if provided
    if (sizes && Array.isArray(sizes)) {
      for (const size of sizes) {
        if (!size.form || !size.value || isNaN(size.stock) || isNaN(size.price)) {
          return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: { 
              sizes: "Each size must have form, value, stock (number), and price (number)" 
            }
          });
        }
      }
    }

    // 5. Duplicate Check (by name and brand combination)
    const existingProduct = await Product.findOne({ name, brand });
    if (existingProduct) {
      return res.status(409).json({ 
        success: false,
        message: "Product with this name and brand already exists",
        existingProductId: existingProduct.productId
      });
    }

    // 6. Create Product Instance
    const product = new Product({
      productId: `prod_${nanoid(8)}`,
      name,
      images,
      category,
      subCategory,
      price: numericPrice,
      description,
      tags: tags || [],
      brand,
      stock: numericStock,
      sizes: sizes || null,
      specifications: specifications || null,
      featured: featured || false,
      rating: {
        average: 0,
        reviewsCount: 0
      },
      // Timestamps will be automatically added by schema
    });

    // 7. Save to Database
    const savedProduct = await product.save();

    // 8. Success Response
    res.status(201).json({ 
      success: true,
      message: "Product added successfully", 
      product: savedProduct,
      links: {
        view: `/products/${savedProduct.productId}`,
        edit: `/admin/products/${savedProduct.productId}/edit`,
        inventory: `/admin/products/${savedProduct.productId}/inventory`
      }
    });

  } catch (error) {
    // 9. Enhanced Error Handling
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).reduce((acc, { path, message }) => ({
        ...acc,
        [path]: message
      }), {});

      return res.status(422).json({ 
        success: false,
        message: "Validation failed", 
        errors
      });
    }

    if (error.code === 11000) { // MongoDB duplicate key error
      return res.status(409).json({
        success: false,
        message: "Product ID or name-brand combination already exists"
      });
    }

    // 10. Server Error Handling
    console.error("Product creation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack
      } : undefined
    });
  }
};

//delete product 
export const deleteProduct = async (req, res) => {
    try {
        const  productId  = req.params.id;

        const product = await Product.findOne({ productId })
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

       
        const deletedProduct = await Product.findOneAndDelete({ productId });

        res.json({
            success: true,
            message: "Product deleted successfully",
            product: deletedProduct,
     })
        
    } catch (error) {
      console.error("Error deleting product", error);
      res.status(500).json({
        success: false,
        message: "Server error while deletind product",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
}


//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
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

export const toggleFeatured = async (req, res) => {
  try {
    const productId  = req.params.id;
    const { featured } = req.body; 

    // Validate input
    if (typeof featured !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Featured status must be a boolean value",
      });
    }

    // Find and update the product
    const product = await Product.findOneAndUpdate(
      {productId},
      { featured },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: `Product ${product.name} featured status updated to ${featured}`,
      product,
    });
  } catch (error) {
    console.error("Error toggling featured status:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating featured status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

//edit a product
export const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    // 1. Validate the updates
    // const allowedUpdates = [
    //   "name",
    //   "price",
    //   "description",
    //   "category",
    //   "subCategory",
    //   "stock",
    //   "images",
    //   "featured",
    //   "specifications",
    //   "sizes",
    //   "brand",
    //   "tags",

    // ];

    // const isValidUpdate = Object.keys(updates).every((key) =>
    //   allowedUpdates.includes(key)
    // );

    // if (!isValidUpdate) {
    //   return res.status(400).json({
    //     success: false,
    //     error: `Invalid updates! Only allowed: ${allowedUpdates.join(", ")}`,
    //   });
    // }

    // 2. Find and update the product
    const product = await Product.findOneAndUpdate(
      {productId},
      updates, 
      {
        new: true, 
        runValidators: true, // Run schema validations on update
      }
    ).select("-__v"); 

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    // 3. Emit real-time update (if using websockets)
    const io = req.app.get("io");
    io.emit("product_updated", product);

    // 4. Send response
    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Edit product error:", error);

    // Handle specific error types
    let statusCode = 500;
    let errorMessage = "An error occurred";

    if (error.name === "ValidationError") {
      statusCode = 400;
      errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
    } else if (error.name === "CastError") {
      statusCode = 400;
      errorMessage = "Invalid product ID format";
    }

    res.status(statusCode).json({
      success: false,
      error:
        process.env.NODE_ENV === "development"
          ? errorMessage
          : "Failed to update product",
    });
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

    const currentReviews = product.rating.reviewsCount;
    const currentAverage = product.rating.average;

    const updatedReviews = currentReviews + 1;
    const updatedAverage =
      (currentAverage * currentReviews + rating) / updatedReviews;

    product.rating.reviewsCount = updatedReviews;
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
