import { CATEGORY_STRUCTURE } from "./constants";
export const LOCAL_STORAGE_KEYS = {
  LAST_VIEWED: "last_viewed_products",
  VISITED_PRODUCTS: "visited_products_count",
  USER_PREFERENCES: "user_preferences",
};

export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);
  return newNumber;
};

export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getAllSubCategories = () => {
  return CATEGORY_STRUCTURE.flatMap((cat) =>
    cat.subCategories.map((sub) => ({
      subCategory: sub,
      mainCategory: cat.category,
      queryKey: `${cat.queryKey}-${sub.toLowerCase().replace(/\s+/g, "-")}`,
    }))
  );
};

export const getRandomSections = () => {
  const allSections = getAllSubCategories();

  return shuffleArray(allSections).slice(0, 7 + Math.floor(Math.random() * 2));
};

export const findCategoryBySubCategory = (subCategory) => {
  return CATEGORY_STRUCTURE.find((cat) =>
    cat.subCategories.includes(subCategory)
  );
};

//user helpers

//track when a product is viewed
export const trackProductView = (productId, productDetails = null) => {
  try {
    // Update last viewed products (limit to 10)
    const lastViewed = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_VIEWED) || "[]"
    );
    const updatedLastViewed = [
      {
        productId,
        timestamp: Date.now(),
        ...(productDetails && {
          category: productDetails.category,
          subCategory: productDetails.subCategory,
        }),
      },
      ...lastViewed.filter((item) => item.productId !== productId),
    ].slice(0, 10);

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.LAST_VIEWED,
      JSON.stringify(updatedLastViewed)
    );

    // Update visit count for recommendations
    const visitedProducts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.VISITED_PRODUCTS) || "{}"
    );
      if (!visitedProducts[productId]) {
        visitedProducts[productId] = {
          count: 1,
          category: productDetails?.category,
          subCategory: productDetails?.subCategory,
          lastViewed: Date.now(),
        };
      } else {
        visitedProducts[productId] = {
          ...visitedProducts[productId],
          count: (visitedProducts[productId].count || 0) + 1,
          lastViewed: Date.now(),
          // Update category info if provided and not already set
          category:
            productDetails?.category || visitedProducts[productId].category,
          subCategory:
            productDetails?.subCategory ||
            visitedProducts[productId].subCategory,
        };
      }
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.VISITED_PRODUCTS,
      JSON.stringify(visitedProducts)
    );
  } catch (error) {
    console.error("Error tracking product view:", error);
  }
};

// Get last viewed products
export const getLastViewedProducts = () => {
  try {
    const lastViewed = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_VIEWED) || "[]"
    );

    // Enhance with category information from visited products
    const visitedProducts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.VISITED_PRODUCTS) || "{}"
    );

    return lastViewed
      .map((item) => ({
        ...item,
        category: visitedProducts[item.productId]?.category,
        subCategory: visitedProducts[item.productId]?.subCategory,
      }))
      .filter((item) => item.category); 
  } catch (error) {
    console.error("Error getting last viewed products:", error);
    return [];
  }
};

// Get user's category preferences based on visited products
export const getUserCategoryPreferences = () => {
  try {
    const visitedProducts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.VISITED_PRODUCTS) || "{}"
    );
    const preferences = {};

    Object.values(visitedProducts).forEach((productData) => {
      if (productData.category) {
        preferences[productData.category] =
          (preferences[productData.category] || 0) + (productData.count || 1);
      }
      if (productData.subCategory) {
        preferences[productData.subCategory] =
          (preferences[productData.subCategory] || 0) +
          (productData.count || 1);
      }

      // Also track category-subcategory combinations
      if (productData.category && productData.subCategory) {
        const combinedKey = `${productData.category}-${productData.subCategory}`;
        preferences[combinedKey] =
          (preferences[combinedKey] || 0) + (productData.count || 1);
      }
    });

    return preferences;
  } catch (error) {
    console.error("Error getting user preferences:", error);
    return {};
  }
};

export const trackProductViewWithDetails = (product) => {
  try {
    trackProductView(product.productId);

    // Store category information for better recommendations
    const preferences = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.USER_PREFERENCES) || "{}"
    );
    const { category, subCategory } = product;

    // Track both main category and specific subcategory
    preferences[category] = (preferences[category] || 0) + 1;
    preferences[subCategory] = (preferences[subCategory] || 0) + 1;
    preferences[`${category}-${subCategory}`] =
      (preferences[`${category}-${subCategory}`] || 0) + 1;

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.USER_PREFERENCES,
      JSON.stringify(preferences)
    );
  } catch (error) {
    console.error("Error tracking product view with details:", error);
  }
};

//add product data to context
export const withProductContext = (queryFn, context) => {
  return async (...args) => {
    const response = await queryFn(...args);
    if (response.data?.products) {
      context.addProducts(response.data.products);
    } else if (response.data?.data?.products) {
      context.addProducts(response.data.data.products);
    } else if (Array.isArray(response.data)) {
      context.addProducts(response.data);
    }
    return response;
  };
};

import { queryClient } from "../index";
import { useMemo } from "react";
// function to check if product exists in any querycache
export const useFindProductInQueryCache = (productId) => {
  return useMemo(() => {
    if (!productId) return null;

    //Get all queries from cache
    const queries = queryClient.getQueryCache().getAll();
    for (const query of queries) {
      const queryData = query.state.data;
      if (queryData && Array.isArray(queryData.pages)) {
        // Check infinite query pages
        for (const page of queryData.pages) {
          if (page.products && Array.isArray(page.products)) {
            const product = page.products.find(
              (p) => p.productId === productId
            );
            if (product) return product;
          }
        }
      } else if (queryData && Array.isArray(queryData.products)) {
        // Check regular product arrays
        const product = queryData.products.find(
          (p) => p.productId === productId
        );
        if (product) return product;
      } else if (
        queryData &&
        queryData.data &&
        Array.isArray(queryData.data.products)
      ) {
        // Check nested product arrays (homepage structure)
        const product = queryData.data.products.find(
          (p) => p.productId === productId
        );
        if (product) return product;
      } else if (queryData && queryData.productId === productId) {
        // Check single product queries
        return queryData;
      }
    }

    return null;
  }, [productId])
} 


export const shuffleProducts = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

