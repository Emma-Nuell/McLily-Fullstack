import { Product } from "../models/productModel.js"
import { User } from "../models/userModel.js"
import { Order } from "../models/orderModel.js"


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