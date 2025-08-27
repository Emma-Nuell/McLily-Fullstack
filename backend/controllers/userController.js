import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";
import {
  populateCart,
  getCartSummary,
  filterOutOfStock,
  shuffleArray,
  populateWishlist,
} from "../utils/helpers.js";

export const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ userId: req.params.id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Server error", details: error.message });
  }
};

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
          currentItem.quantity + localItem.quantity,
          localItem.max || 10 // Fallback if max not provided
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

export const getHomepage = async (req, res) => {
  try {
    const { preferences, lastViewed = [] } = req.body;

    const [
      featuredProducts,
      topSellers,
      recommendedProducts,
      randomCategoriesData,
    ] = await Promise.all([
      //featured products
      Product.find({
        featured: true,
        $or: [{ stock: { $gt: 0 } }, { "sizes.stock": { $gt: 0 } }],
      })
        .limit(12)
        .lean(),

      //top sellers
      Product.find({
        $or: [{ stock: { $gt: 0 } }, { "sizes.stock": { $gt: 0 } }],
      })
        .sort({ sales: -1 })
        .limit(6)
        .lean(),

      //recommended products
      getRecommendedProducts(preferences, lastViewed),

      //random categories with products
      getRandomCategoriesWithProducts(),
    ]);

    const filteredFeatured = filterOutOfStock(featuredProducts).slice(0, 8);
    const filteredTopSellers = filterOutOfStock(topSellers).slice(0, 4);
    const filteredRecommended = filterOutOfStock(recommendedProducts).slice(
      0,
      8
    );

    const lastViewedProducts =
      lastViewed.length > 0
        ? await Product.find({
            productId: { $in: lastViewed },
            $or: [{ stock: { $gt: 0 } }, { "sizes.stock": { $gt: 0 } }],
          })
            .limit(6)
            .lean()
        : [];

    const filteredLastViewed = filterOutOfStock(lastViewedProducts).slice(0, 4);

    res.status(200).json({
      success: true,
      data: {
        featured: filteredFeatured,
        topSellers: filteredTopSellers,
        recommended: filteredRecommended,
        randomCategories: randomCategoriesData,
        lastViewed: filteredLastViewed,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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
    if (lastViewed.length > 0) {
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

export const getCategoryProducts = async () => {
  try {
    const {
      category,
      subCategory,
      allSubCategory,
      surpriseMe,
      page = 1,
      limit = 12,
      sort = "random",
    } = req.query;

    let query = {
      $or: [{ stock: { $gt: 0 } }, { "sizes.stock": { $gt: 0 } }],
    };

    // handle different filter cases
    if (surpriseMe === "true") {
      // Random products - no category filter
    } else if (allSubCategory) {
      // Get all products with this subCategory regardless of main category
      // Special case for "Clothing Accessories"
      query.subCategory = allSubCategory;
    } else if (subCategory && category) {
      // Specific category + subcategory (e.g., Women -> Shoes)
      query.category = category;
      query.subCategory = subCategory;
    } else if (subCategory && !category) {
      // Only subcategory (e.g., just "Shoes" across all categories)
      query.subCategory = subCategory;
    } else if (category && !subCategory) {
      // Only category (e.g., just "Women" category)
      query.category = category;
    }


    // Sort options
    let sortOptions = {};
    switch (sort) {
      case "price-low":
        sortOptions = { price: 1 };
        break;
      case "price-high":
        sortOptions = { price: -1 };
        break;
      case "top-sellers":
        sortOptions = { sales: -1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "name-az":
        sortOptions = { name: 1 };
        break;
      case "name-za":
        sortOptions = { name: -1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "random":
        // For random, we'll handle it differently
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    let products;
    let total

    if (sort == "random") {
      total = await Product.countDocuments(query)

      const randomSkip = Math.floor(Math.random() * Math.max(0, total - limit))

      products = await Product.find(query)
        .skip(randomSkip)
        .limit(limit * 1)
        .lean();
    } else {
      products = await Product.find(query)
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean();

      total = await Product.countDocuments(query);
    }

    const filteredProducts = filterOutOfStock(products)

    res.json({
      success: true,
      products: filteredProducts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total: total,
      hasMore: parseInt(page) < Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategoryFilters = async (req, res) => {
  try {
    const { category, subCategory } = req.query;

    let query = {};
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory

    const brands = await Product.distinct("brand", query);

    const priceRange = await Product.aggregate([
      { $match: query },
      {
        $group: { _id: null, min: { $min: "$price" }, max: { $max: "$price" } },
      },
    ]);

    res.status(200).json({
      success: true,
      filters: {
        brands: brands.filter((brand) => brand).sort(),
        priceRange:
          priceRange.length > 0 ? priceRange[0] : { min: 0, max: 100000 },
      },
    });
  } catch (error) {
       res.status(500).json({ success: false, message: error.message})
  }
} 

//get search suggestions
export const getSearchSuggestions = async (req, res) => {
  try {
 const { q, limit = 5 } = req.query;

 if (!q || q.length < 2) {
   return res.json({ success: true, suggestions: [] });
 }

 const suggestions = await Product.aggregate([
   {
     $search: {
       index: "productSearch", // need to create this search index
       autocomplete: {
         query: q,
         path: "name",
         fuzzy: {
           maxEdits: 1,
           prefixLength: 2,
         },
       },
     },
   },
   { $limit: parseInt(limit) },
   {
     $project: {
       productId: 1,
       name: 1,
       category: 1,
       subCategory: 1,
       brand: 1,
       image: { $arrayElemAt: ["$images", 0] },
       score: { $meta: "searchScore" },
     },
   },
 ]);

 // Fallback if search index isn't setup
 if (suggestions.length === 0) {
   const fallbackSuggestions = await Product.find({
     $or: [
       { name: { $regex: q, $options: "i" } },
       { brand: { $regex: q, $options: "i" } },
       { category: { $regex: q, $options: "i" } },
       { subCategory: { $regex: q, $options: "i" } },
       { tags: { $in: [new RegExp(q, "i")] } },
     ],
   })
     .limit(parseInt(limit))
     .lean();

   res.json({
     success: true,
     suggestions: fallbackSuggestions.map((p) => ({
       ...p,
       image: p.images[0],
     })),
   });
 } else {
   res.json({ success: true, suggestions });
 }
  } catch (error) {
console.error("Search suggestions error:", error);
res.status(500).json({ success: false, message: error.message });
  }
}

//get searched products
export const getSearchProducts = async (req, res) => {
  try {
    const {
      q,
      category,
      subCategory,
      minPrice,
      maxPrice,
      brand,
      sort = "relevance",
      page = 1,
      limit = 12,
    } = req.query;

    // Build search query
    let query = {
      $or: [{ stock: { $gt: 0 } }, { "sizes.stock": { $gt: 0 } }],
    };

    // Text search
    if (q && q.length > 0) {
      query.$text = { $search: q };
    }

    // Category filters
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Brand filter
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    // Sort options
    let sortOptions = {};
    switch (sort) {
      case "price-low":
        sortOptions = { price: 1 };
        break;
      case "price-high":
        sortOptions = { price: -1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "rating":
        sortOptions = { "rating.average": -1 };
        break;
      case "relevance":
        sortOptions = q ? { score: { $meta: "textScore" } } : { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const searchQuery = Product.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)

    // If text search, add text score
    if (q) {
      searchQuery.select({ score: { $meta: "textScore" } });
    }

    const [products, total] = await Promise.all([
      searchQuery.lean(),
      Product.countDocuments(query),
    ]);

    // Get filter options for the search results
    const brands = await Product.distinct("brand", query);
    const categories = await Product.distinct("category", query);
    const subCategories = await Product.distinct("subCategory", query);
    const priceRange = await Product.aggregate([
      { $match: query },
      {
        $group: { _id: null, min: { $min: "$price" }, max: { $max: "$price" } },
      },
    ]);

    res.status(200).json({
      success: true,
      products: filterOutOfStock(products),
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      filters: {
        brands: brands.filter((b) => b).sort(),
        categories: categories.filter((c) => c).sort(),
        subCategories: subCategories.filter((s) => s).sort(),
        priceRange: priceRange[0] || { min: 0, max: 100000 },
      },
      searchQuery: q,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


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

