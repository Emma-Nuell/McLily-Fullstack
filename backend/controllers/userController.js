import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";
import {
  populateCart,
  getCartSummary,
  filterOutOfStock,
  shuffleArray,
  populateWishlist,
} from "../utils/helpers.js";
import { Order } from "../models/orderModel.js";


export const getCart = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const populatedCart = await populateCart(user.cart, true, user);
    res.status(200).json({ success: true, cart: populatedCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
};

// add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const existingItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, size, quantity });
    }

    await user.save();
    const populatedCart = await populateCart(user.cart);

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      message: error.message,
    });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    user.cart = user.cart.filter(
      (item) => !(item.productId.toString() === productId && item.size === size)
    );

    await user.save();
    const populatedCart = await populateCart(user.cart);

    res.status(200).json({
      success: true,
      message: "item removed from cart",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      message: error.message,
    });
  }
};

// update cart item quanity
export const updateCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const item = user.cart.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (item) {
      item.quantity = quantity;
      await user.save();
      const populatedCart = await populateCart(user.cart);

      res.status(200).json({
        success: true,
        message: "update successful",
        cart: populatedCart,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// clear cart
export const clearCart = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    user.cart = [];
    await user.save();
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const mergeCart = async (req, res) => {
  const { items } = req.body;
  const userId = req.user.userId;
  try {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    items.forEach((localItem) => {
      const existingItemIndex = user.cart.findIndex(
        (backendItem) =>
          backendItem.productId.toString() === localItem.productId &&
          backendItem.size === localItem.size
      );

      if (existingItemIndex > -1) {
        // Update quantity - don't exceed available stock
        // You might want to fetch current stock from product database
        const currentItem = user.cart[existingItemIndex];
        const newQuantity = Math.min(
          localItem.quantity,
          localItem.max || 3 // Fallback if max not provided
        );
        user.cart[existingItemIndex].quantity = newQuantity;
      } else {
        // Add new item
        user.cart.push({
          productId: localItem.productId,
          size: localItem.size,
          quantity: Math.min(localItem.quantity, localItem.max || 10),
        });
      }
    });
    await user.save();
    const populatedCart = await populateCart(user.cart);

    res.status(200).json({
      success: true,
      message: "cart merged successfully",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      details: error.message,
    });
  }
};


//get user wishlist
export const getUserWishlist = async (req, res) => {
  try {
     const user = await User.findOne({userId: req.user.userId});
     if (!user) {
       return res
         .status(404)
         .json({ success: false, message: "User not found" });
     }

     const populatedWishlist = await populateWishlist(user.wishlist);

     res.status(200).json({
       success: true,
       wishlist: populatedWishlist,
     });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
} 

//add to wishlist
export const addToWishlist = async (req, res) => {
  try {
     const { productId } = req.body;

     if (!productId) {
       return res
         .status(400)
         .json({ success: false, message: "Product ID is required" });
     }

     const user = await User.findOne({ userId: req.user.userId });

     // Check if product already in wishlist
     const alreadyInWishlist = user.wishlist.some(
       (item) => item.productId === productId
     );

     if (alreadyInWishlist) {
       return res
         .status(400)
         .json({ success: false, message: "Product already in wishlist" });
     }

     // Add to wishlist
     user.wishlist.push({
       productId,
       addedAt: new Date(),
     });

     await user.save();

     // Return populated wishlist
     const populatedWishlist = await populateWishlist(user.wishlist);

     res.status(200).json({
       success: true,
       message: "Product added to wishlist",
       wishlist: populatedWishlist,
     });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
      const { productId } = req.params;

      const user = await User.findOne({ userId: req.user.userId });

      // Remove from wishlist
      user.wishlist = user.wishlist.filter(
        (item) => item.productId !== productId
      );

      await user.save();

      // Return populated wishlist
      const populatedWishlist = await populateWishlist(user.wishlist);

      res.status(200).json({
        success: true,
        message: "Product removed from wishlist",
        wishlist: populatedWishlist,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//Check if product is in wishlist
export const checkWishlist = async (req, res) => {
  try {
     const { productId } = req.params;

     const user = await User.findOne({ userId: req.user.userId });
     const inWishlist = user.wishlist.some(
       (item) => item.productId === productId
     );

     res.json({
       success: true,
       inWishlist,
     });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


//Check if a user can review a product
export const canReview = async (req, res) => {
   try {
     const { productId } = req.params;
     const userId = req.user.userId;

     // Check if user has purchased this product
     const hasPurchased = await Order.exists({
       userId,
       "orderItems.productId": productId,
       orderStatus: "delivered",
     });

     // Check if user already reviewed this product
     const alreadyReviewed = await Product.exists({
       productId,
       "reviews.userId": userId,
     });

     res.status(200).json({
       success: true,
       canReview: hasPurchased && !alreadyReviewed,
       hasPurchased: !!hasPurchased,
       alreadyReviewed: !!alreadyReviewed,
     });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
}

// Get a user pending reviews
export const userPendingReviews = async (req, res) => {
    try {
    const userId = req.user.userId;

    // Find all delivered orders for the user with order details
    const deliveredOrders = await Order.find({
      userId,
      orderStatus: "delivered",
    }).select("orderId orderedAt orderItems");

    // Create a map of productId to order details
    const productOrderMap = new Map();
    const purchasedProductIds = [];

    deliveredOrders.forEach(order => {
      order.orderItems.forEach(item => {
        purchasedProductIds.push(item.productId);
        
        // Store the most recent order details for each product
        if (!productOrderMap.has(item.productId) || 
            new Date(order.orderedAt) > new Date(productOrderMap.get(item.productId).orderedAt)) {
          productOrderMap.set(item.productId, {
            orderId: order.orderId,
            orderedAt: order.orderedAt,
            deliveredDate: order.orderedAt, // Assuming delivered date is same as orderedAt for simplicity
            // You might want to add actual delivery date tracking in your Order schema
          });
        }
      });
    });

    // Find products that user hasn't reviewed yet
    const productsToReview = await Product.find({
      productId: { $in: purchasedProductIds },
      "reviews.userId": { $ne: userId },
    }).select("productId name images price category");

    // Combine product details with order details
    const pendingReviews = productsToReview.map(product => {
      const orderDetails = productOrderMap.get(product.productId);
      const deliveredDate = new Date(orderDetails.deliveredDate);
      const currentDate = new Date();
      const daysSinceDelivery = Math.floor((currentDate - deliveredDate) / (1000 * 60 * 60 * 24));
      
      return {
        _id: product._id,
        productId: product.productId,
        productName: product.name,
        image: product.images[0],
        category: product.category,
        purchaseDate: orderDetails.orderedAt,
        orderId: orderDetails.orderId,
        price: product.price,
        hasRated: false,
        canRate: true,
        deliveredDate: orderDetails.deliveredDate,
        daysSinceDelivery: daysSinceDelivery
      };
    });

    res.status(200).json({
      success: true,
      pendingReviews: pendingReviews.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get a user submitted reviews
export const userReviews = async (req, res) => {
   try {
     const userId = req.user.userId;

     // Find all delivered orders to get order details
     const deliveredOrders = await Order.find({
       userId,
       orderStatus: "delivered",
     }).select("orderId orderedAt orderItems");

     // Create a map of productId to order details
     const productOrderMap = new Map();
     deliveredOrders.forEach((order) => {
       order.orderItems.forEach((item) => {
         // Store the most recent order details for each product
         if (
           !productOrderMap.has(item.productId) ||
           new Date(order.orderedAt) >
             new Date(productOrderMap.get(item.productId).orderedAt)
         ) {
           productOrderMap.set(item.productId, {
             orderId: order.orderId,
             orderedAt: order.orderedAt,
             deliveredDate: order.orderedAt,
           });
         }
       });
     });

     // Find all products that user has reviewed
     const reviewedProducts = await Product.find({
       "reviews.userId": userId,
     }).select("productId name images price category reviews");

     // Extract user's reviews with combined product and order info
     const userReviews = reviewedProducts.flatMap((product) => {
       const userReview = product.reviews.find(
         (review) => review.userId === userId
       );

       if (!userReview) return [];

       const orderDetails = productOrderMap.get(product.productId);
       const deliveredDate = new Date(
         orderDetails?.deliveredDate || product.createdAt
       );
       const currentDate = new Date();
       const daysSinceDelivery = orderDetails
         ? Math.floor((currentDate - deliveredDate) / (1000 * 60 * 60 * 24))
         : null;

       return {
         _id: userReview._id,
         productId: product.productId,
         productName: product.name,
         productImage: product.images[0],
         productPrice: product.price,
         category: product.category,
         purchaseDate: orderDetails?.orderedAt,
         orderId: orderDetails?.orderId,
         deliveredDate: orderDetails?.deliveredDate,
         daysSinceDelivery: daysSinceDelivery,

         // Review details
         rating: userReview.rating,
         reviewTitle: userReview.reviewTitle,
         reviewMessage: userReview.reviewMessage,
         reviewDate: userReview.date,
         verified: userReview.verified,

         hasRated: true,
         canRate: false, // Already rated
       };
     });

     res.json({
       success: true,
       reviews: userReviews.sort(
         (a, b) => new Date(b.reviewDate) - new Date(a.reviewDate)
       ),
     });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
}


// Get all user reviews
export const userAllReviews = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get all delivered orders with details
    const deliveredOrders = await Order.find({
      userId,
      orderStatus: "delivered",
    }).select("orderId orderedAt orderItems");

    // Create map of productId to order details
    const productOrderMap = new Map();
    const allPurchasedProductIds = [];

    deliveredOrders.forEach((order) => {
      order.orderItems.forEach((item) => {
        allPurchasedProductIds.push(item.productId);
        if (
          !productOrderMap.has(item.productId) ||
          new Date(order.orderedAt) >
            new Date(productOrderMap.get(item.productId).orderedAt)
        ) {
          productOrderMap.set(item.productId, {
            orderId: order.orderId,
            orderedAt: order.orderedAt,
            deliveredDate: order.orderedAt,
          });
        }
      });
    });

    // Get all products the user has purchased
    const purchasedProducts = await Product.find({
      productId: { $in: allPurchasedProductIds },
    }).select("productId name images price category reviews");

    // Separate into pending and submitted reviews
    const pendingReviews = [];
    const submittedReviews = [];

    purchasedProducts.forEach((product) => {
      const userReview = product.reviews.find(
        (review) => review.userId === userId
      );
      const orderDetails = productOrderMap.get(product.productId);

      const baseData = {
        _id: product._id,
        productId: product.productId,
        productName: product.name,
        image: product.images[0],
        category: product.category,
        purchaseDate: orderDetails?.orderedAt,
        orderId: orderDetails?.orderId,
        price: product.price,
        deliveredDate: orderDetails?.deliveredDate,
        daysSinceDelivery: orderDetails
          ? Math.floor(
              (new Date() - new Date(orderDetails.deliveredDate)) /
                (1000 * 60 * 60 * 24)
            )
          : null,
      };

      if (userReview) {
        // User has reviewed this product
        submittedReviews.push({
          ...baseData,
          rating: userReview.rating,
          reviewTitle: userReview.reviewTitle,
          reviewMessage: userReview.reviewMessage,
          reviewDate: userReview.date,
          verified: userReview.verified,
          hasRated: true,
          canRate: false,
        });
      } else {
        // User hasn't reviewed this product yet
        pendingReviews.push({
          ...baseData,
          hasRated: false,
          canRate: true,
        });
      }
    });

    res.status(200).json({
      success: true,
      data: {
        pendingReviews: pendingReviews.sort(
          (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
        ),
        submittedReviews: submittedReviews.sort(
          (a, b) => new Date(b.reviewDate) - new Date(a.reviewDate)
        ),
        stats: {
          totalPurchased: allPurchasedProductIds.length,
          pendingReview: pendingReviews.length,
          reviewed: submittedReviews.length,
          reviewRate:
            allPurchasedProductIds.length > 0
              ? (
                  (submittedReviews.length / allPurchasedProductIds.length) *
                  100
                ).toFixed(1) + "%"
              : "0%",
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
