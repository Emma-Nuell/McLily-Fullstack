import { Product } from "../models/productModel.js";
import {
  filterOutOfStock,
  getRandomCategoriesWithProducts,
  getRecommendationType,
  getRecommendedProducts,
  shuffleArray,
} from "../utils/helpers.js";

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
      await getRecommendedProducts(preferences, lastViewed),

      //random categories with products
      await getRandomCategoriesWithProducts(),
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

export const getRecommended = async (req, res) => {
  try {
    const { preferences, lastViewed = [] } = req.body;

    // Get recommended products using your helper function
    const recommendedProducts = await getRecommendedProducts(
      preferences,
      lastViewed
    );

    // Filter out out-of-stock products
    const inStockProducts = recommendedProducts.filter((product) => {
      if (product.stock > 0) return true;

      // For products with sizes, check if any size has stock
      if (product.sizes && product.sizes.length > 0) {
        return product.sizes.some((size) => size.stock > 0);
      }

      return false;
    });

    res.json({
      success: true,
      products: inStockProducts,
      total: inStockProducts.length,
      // Add metadata about the recommendation type
      recommendationType: getRecommendationType(preferences, lastViewed),
    });
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recommendations",
      products: [], // Return empty array instead of failing completely
    });
  }
};

export const getCategoryProducts = async (req, res) => {
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
        sortOptions = { price: 1, _id: 1 };
        break;
      case "price-high":
        sortOptions = { price: -1, _id: 1 };
        break;
      case "top-sellers":
        sortOptions = { sales: -1, _id: 1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1, _id: 1 };
        break;
      case "name-az":
        sortOptions = { name: 1, _id: 1 };
        break; 
      case "name-za":
        sortOptions = { name: -1, _id: 1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1, _id: 1 };
        break;
      case "random":
        // For random, we'll handle it differently
        break;
      default:
        sortOptions = { createdAt: -1, _id: 1 };
    }

    let products;
    let total;

    if (sort == "random") {
      total = await Product.countDocuments(query);

      // For random sorting, we'll get a larger sample once and paginate through it
      const sampleSize = Math.min(total, 200); // Sample enough for several pages

      const aggregatedProducts = await Product.aggregate([
        { $match: query },
        { $sample: { size: sampleSize } },
      ]);

      // Apply pagination to the sampled results
      const skip = (page - 1) * limit;
      const startIdx = Math.min(skip, aggregatedProducts.length);
      const endIdx = Math.min(startIdx + limit, aggregatedProducts.length);
      const pageProducts = aggregatedProducts.slice(startIdx, endIdx);

      const productIds = pageProducts.map((p) => p._id);
      products = await Product.find({ _id: { $in: productIds } });
    } else {
      products = await Product.find(query)
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean();

      total = await Product.countDocuments(query);
    }

    const filteredProducts = filterOutOfStock(products);

    res.json({
      success: true,
      products: filteredProducts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total: total,
      hasMore: parseInt(page) < Math.ceil(total / limit),
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
    if (subCategory) query.subCategory = subCategory;

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
    res.status(500).json({ success: false, message: error.message });
  }
};

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
};

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
      try {
        query.$text = { $search: q };
        
      } catch (error) {
        // Fallback to regex search if text index doesn't exist
        const searchRegex = new RegExp(
          q.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
          "i"
        );
        query.$or.push(
          { name: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { brand: { $regex: searchRegex } },
          { category: { $regex: searchRegex } },
          { subCategory: { $regex: searchRegex } },
          { tags: { $in: [searchRegex] } }
        );
      }
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
      .skip((page - 1) * limit);

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
};
