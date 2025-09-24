import { Product } from "../models/productModel.js"
import { User } from "../models/userModel.js"
import { Order } from "../models/orderModel.js"


// store helpers

export const getRecommendedProducts = async (preferences, lastViewed) => {
  try {
    let query = {
      $or: [{ stock: { $gt: 0 } }, { "sizes.stock": { $gt: 0 } }],
    };
    let sort = {};

    // if user has preferences, use them
    if (Object.keys(preferences).length > 0) {
      const preferredCategories = Object.keys(preferences)
        .sort((a, b) => preferences[b] - preferences[a])
        .slice(0, 3);

      query.$or = [
        ...query.$or,
        ...preferredCategories.map((category) => ({
          $or: [
            { category: category },
            { subCategory: category },
            {
              category: {
                $regex: category.split("-")[0],
                $options: "i",
              },
            },
          ],
        })),
      ];
    }

    // if user has last viewed products, recommend similar
    if (lastViewed && lastViewed.length > 0) {
      const lastViewedProducts = await Product.find({
        productId: { $in: lastViewed },
      }).select("category subCategory");

      const categories = [
        ...new Set(lastViewedProducts.map((p) => p.category)),
      ];
      const subCategories = [
        ...new Set(lastViewedProducts.map((p) => p.subCategory)),
      ];

      query.$or = [
        ...query.$or,
        { category: { $in: categories } },
        { subCategory: { $in: subCategories } },
      ];

      query.productId = { $nin: lastViewed }; // exclude already viewed
    }

    if (Object.keys(preferences).length === 0 && lastViewed.length === 0) {
      sort = { visits: -1, sales: -1 };
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(12) // Get more than needed for filtering
      .lean();

    return filterOutOfStock(products);
  } catch (error) {
    console.error("Error getting recommended products: ", error);
    return [];
  }
};



export const getRandomCategoriesWithProducts = async () => {
  try {
    //category structure
    const categoryStructure = [
      {
        category: "Women",
        subCategories: [
          "Clothes",
          "Shoes",
          "Clothing Accessories",
          "Clothing Fabrics",
        ],
      },
      {
        category: "Men",
        subCategories: [
          "Clothes",
          "Shoes",
          "Clothing Accessories",
          "Clothing Fabrics",
        ],
      },
      {
        category: "Unisex",
        subCategories: [
          "Clothes",
          "Shoes",
          "Clothing Accessories",
          "Clothing Fabrics",
        ],
      },
      {
        category: "Teens & Kids",
        subCategories: [
          "Clothes",
          "Shoes",
          "Clothing Accessories",
          "Toys & Games",
        ],
      },
      {
        category: "Babies",
        subCategories: ["Clothes", "Shoes", "Toys & Games", "Baby Products"],
      },
      {
        category: "Accessories",
        subCategories: [
          "Household Items",
          "Clothing Accessories",
          "Electronic Accessories",
        ],
      },
    ];

    //flatten all subcategories
    const allSubCategories = categoryStructure.flatMap((cat) =>
      cat.subCategories.map((sub) => ({
        subCategory: sub,
        mainCategory: cat.category,
      }))
    );

    //shuffle array and get products for each category
    const randomSubCategories = shuffleArray(allSubCategories).slice(0, 8);

    const categoriesWithProducts = await Promise.all(
      randomSubCategories.map(async ({ subCategory, mainCategory }) => {
        const products = await Product.find({
          subCategory,
          $or: [{ stock: { $gt: 0 } }, { "sizes.stock": { $gt: 0 } }],
        })
          .limit(6)
          .lean();

        const filteredProducts = filterOutOfStock(products).slice(0, 4);

        return {
          mainCategory,
          subCategory,
          products: filteredProducts,
        };
      })
    );

    return categoriesWithProducts.filter((item) => item.products.length > 0);
  } catch (error) {
    console.error("Error getting random categories:", error);
    return [];
  }
};

export const getRecommendationType = (preferences, lastViewed) => {
  if (Object.keys(preferences || {}).length > 0) {
    return "personalized";
  } else if (lastViewed && lastViewed.length > 0) {
    return "similar_to_viewed";
  } else {
    return "popular";
  }
};


// order helpers
/**
 * Populates user orders with order details
 * @param {Array} orderRefs - Array of order references from user.orders
 * @returns {Promise<Array>} - Array of populated order documents
 */
export const populateUserOrders = async (orderRefs) => {
    try {
        const orderIds = orderRefs.map(ref => ref.orderId)
        const orders = await Order.find({ orderId: { $in: orderIds } }).sort({ orderedAt: -1 })
        
        return orderRefs.map(ref => {
            const order = orders.find(o => o.orderId === ref.orderId)
            return order ? order.toObject() : null
        }).filter(order => order !== null)
    } catch (error) {
        console.error("Error populating orders: ", error);
        throw error    
    }
}

/**
 * Gets order summary for a user
 * @param {Array} orders - Array of order documents
 * @returns {Object} - Order summary statistics
 */

export const getOrderSummary = (orders) => {
  const totalOrders = orders.length;
  const totalSpent = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
    return acc;
  }, {});

  return {
    totalOrders,
    totalSpent,
    statusCounts,
  };
};


// Error handling function
export const handleOrderError = (res, error, context) => {
  console.error(`Error ${context}:`, error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: `Validation error: ${error.message}`
    });
  }

  if (error.message.includes('not found')) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }

  if (error.message.includes('Insufficient stock')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.status(500).json({
    success: false,
    message: `Error ${context}. Please try again.`
  });
};




//products helpers
/**
 * filters out products out of stock
 * @param {Array} products - Array of product documents
 * @returns {Array} - Array of products in stock
 */
export const filterOutOfStock = (products) => {
  return products.filter(product => {
    if (product.stock > 0) return true;
    
    // For products with sizes, check if any size has stock
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes.some(size => size.stock > 0);
    }
    
    return false;
  });
};

/**
 * update product stock after a successful order creation
 * @param {Array} orderItems - Array of product documents
 * @returns null 
 */
export const updateProductStocks = async (orderItems, session) => {
  for (const item of orderItems) {
    const product = await Product.findOne({
      productId: item.productId,
    }).session(session);

    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product ${product.name}`);
    }

    // Update stock
    product.stock -= item.quantity;

    // Update sales count
    product.sales = (product.sales || 0) + item.quantity;

    // If product has sizes, update specific size stock
    if (product.sizes && item.size) {
      const sizeIndex = product.sizes.findIndex((s) => s.value === item.size);
      if (sizeIndex !== -1) {
        if (product.sizes[sizeIndex].stock < item.quantity) {
          throw new Error(
            `Insufficient stock for size ${item.size} of product ${product.name}`
          );
        }
        product.sizes[sizeIndex].stock -= item.quantity;
      }
    }

    await product.save({ session });
  }
};


/**
 * Restore product stocks when orders are cancelled, refunded, or failed
 * @param {Array} orderItems - Array of order items to restore
 * @param {Object} session - MongoDB session (optional)
 * @returns {Promise<Object>} - Result of the restoration process
 */
export async function restoreProductStocks(orderItems, session = null) {
  const results = {
    successful: [],
    failed: [],
    warnings: []
  };

  try {
    for (const item of orderItems) {
      try {
        const product = await Product.findOne({ productId: item.productId }).session(session);
        
        if (!product) {
          results.warnings.push({
            productId: item.productId,
            message: 'Product not found',
            item
          });
          continue;
        }

        // Restore main stock
        product.stock += item.quantity;
        
        // Restore size-specific stock if applicable
        if (item.size && product.sizes && product.sizes.length > 0) {
          const sizeIndex = product.sizes.findIndex(s => s.value === item.size);
          
          if (sizeIndex !== -1) {
            product.sizes[sizeIndex].stock += item.quantity;
            results.successful.push({
              productId: item.productId,
              productName: product.name,
              size: item.size,
              quantity: item.quantity,
              type: 'size-specific'
            });
          } else {
            // Size not found, but we still restore main stock
            results.warnings.push({
              productId: item.productId,
              productName: product.name,
              size: item.size,
              message: 'Size not found in product, only main stock restored',
              item
            });
            results.successful.push({
              productId: item.productId,
              productName: product.name,
              quantity: item.quantity,
              type: 'main-stock-only'
            });
          }
        } else {
          // No size specified, just restore main stock
          results.successful.push({
            productId: item.productId,
            productName: product.name,
            quantity: item.quantity,
            type: 'main-stock'
          });
        }

        // Update sales count (decrement)
        product.sales = Math.max(0, (product.sales || 0) - item.quantity);

        await product.save({ session });

      } catch (itemError) {
        results.failed.push({
          productId: item.productId,
          error: itemError.message,
          item
        });
        console.error(`Error restoring stock for product ${item.productId}:`, itemError);
      }
    }

    return results;

  } catch (error) {
    console.error('Error in restoreProductStocks:', error);
    throw error;
  }
}

/**
 * Restore stocks with transaction support for atomic operations
 * @param {Array} orderItems - Array of order items to restore
 * @returns {Promise<Object>} - Result of the restoration process
 */
export async function restoreProductStocksWithTransaction(orderItems) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const results = await restoreProductStocks(orderItems, session);
    
    // If any items failed, roll back the entire transaction
    if (results.failed.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return {
        ...results,
        transaction: 'rolled-back'
      };
    }

    await session.commitTransaction();
    session.endSession();
    
    return {
      ...results,
      transaction: 'committed'
    };

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Transaction error in restoreProductStocks:', error);
    throw error;
  }
}


/**
 * Restore stocks for a specific order
 * @param {String} orderId - Order ID to restore stocks for
 * @returns {Promise<Object>} - Result of the restoration process
 */
export async function restoreStocksByOrderId(orderId) {
  try {
    const order = await Order.findOne({ orderId });
    
    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }

    if (!order.orderItems || order.orderItems.length === 0) {
      return {
        success: true,
        message: 'No items to restore',
        orderId
      };
    }

    const results = await restoreProductStocks(order.orderItems);
    
    return {
      success: results.failed.length === 0,
      results,
      orderId,
      orderStatus: order.orderStatus
    };

  } catch (error) {
    console.error(`Error restoring stocks for order ${orderId}:`, error);
    throw error;
  }
}



// Shuffle function
export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};


//cart helpers
/** 
 * Populates cart items with product details
 * @param {Array} cartItems - Array of cart items with productId references
 * @returns {Promise<Array>} - Array of populated cart items
*/
export const populateCart = async (cartItems, updateUserCart = false, user = null) => {
try {
    const populatedCart = await Promise.all(
        cartItems.map(async (cartItem) => {
            try {
                const product = await Product.findOne({
                    productId: cartItem.productId
                }).select("name price images stock sizes brand productId")

                if (!product) {
                    return null //product not found
                }

                const availableStock = cartItem.size
                  ? product.sizes?.find((s) => s.value === cartItem.size)
                      ?.stock || 0
                    : product.stock;
                
                let finalQuantity = cartItem.quantity
                if (finalQuantity > availableStock) {
                    finalQuantity = availableStock

                    if (updateUserCart && user) {
                        const itemIndex = user.cart.findIndex(
                            item => item.productId === cartItem.productId && item.size === cartItem.size
                        )
                        if (itemIndex > -1) {
                          user.cart[itemIndex].quantity = finalQuantity;
                        }
                    }
                }

                return {
                    ...(cartItem.toObject ? cartItem.toObject() : cartItem),
                    productDetails: product,
                    availableStock,
                    max: availableStock,
                    quantity: finalQuantity
                };

            } catch (error) {
                console.error('Error populating product: ', error);
                return null
            }
        })
    )
    const validCart = populatedCart.filter(item => item !== null)
    
    if (updateUserCart && user && validCart.length > 0) {
      await user.save();
    }

    return validCart
} catch (error) {
    console.error('Error in populateCart: ', error);
    throw error
}
}

/**
 * Gets cart summary (total items, total price)
 * @param {Array} populatedCart - Array of populated cart items
 * @returns {Object} - Summary object
 */
export const getCartSummary = (populatedCart) => {
  const totalItems = populatedCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = populatedCart.reduce((sum, item) => 
    sum + (item.productDetails.price * item.quantity), 0
  );
  
  return { totalItems, totalPrice };
};

//helper function to populate wishlist
export const populateWishlist = async (wishlistItems) => {
  try {
    const productIds = wishlistItems.map((item) => item.productId);

    const products = await Product.find({
      productId: { $in: productIds },
    })

    // Map products to wishlist items with addedAt
    return wishlistItems
      .map((wishlistItem) => {
        const product = products.find(
          (p) => p.productId === wishlistItem.productId
        );
        return product
          ? {
              ...product.toObject(),
              addedAt: wishlistItem.addedAt,
            }
          : null;
      })
      .filter((item) => item !== null); // Remove products that might have been deleted
  } catch (error) {
    console.error("Error populating wishlist:", error);
    throw error;
  }
};



//payment helpers



/**
 * Verify order payment for a user
 * @param {String} refernence from paystack
 * @returns true or false
 */
export const verifyPaystackPayment = async (reference) => {
  try {

    // Production: Verify with Paystack API
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status && data.data.status === "success") {
      return {
        success: true,
        message: "Payment verified successfully",
        data: data.data
      };
    } else {
      return {
        success: false,
        message: data.message || "Payment verification failed",
        data: data.data
      };
    }
  } catch (error) {
    console.error("Paystack verification error:", error);
    return {
      success: false,
      message: "Payment verification service unavailable"
    };
  }
};


