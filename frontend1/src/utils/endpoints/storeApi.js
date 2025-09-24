import axios from "../axiosInstance";
// import { getLastViewedProducts } from "../helpers";

const StoreAPI = {
  getHomepageData: async (userPreferences = {}, lastViewedIds = []) => {
    try {
      const response = await axios.post("/store/homepage", {
        preferences: userPreferences,
        lastViewed: lastViewedIds,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching homepage data:", error);

      // Return fallback only on error
      return {
        success: false,
        data: {
          featured: [],
          topSellers: [],
          recommended: [],
          randomCategories: [],
          lastViewed: [],
        },
        error: error.response?.data?.message || error.message,
      };
    }
  },
  getRecommendedProducts: async (preferences) => {
    try {
      const response = await axios.post("/store/recommended", { preferences });
      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
  getFilteredProducts: async (filters) => {
    try {
      const params = {
        ...filters,
      };

      const response = await axios.get("/store/filtered-products", {
        params,
      });

      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
  getFilterOptions: async (category, subCategory) => {
    try {
      const response = await axios.get("/store/filter-options", {
        params: { category, subCategory },
      });
      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
  getProductsInfinite: async ({ pageParam = 1, ...filters }) => {
    try {
      const params = {
        ...filters,
        page: pageParam,
      };

      const response = await axios.get("/store/filtered-products", { params });

      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
  fetchProduct: async (productId) => {
    try {
      const response = await axios.get(`/store/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
  getSearchSuggestions: async (query, limit = 5) => {
    try {
      const response = await axios.get("/store/search/suggestions", {
        params: { q: query, limit },
      });
      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
  getSearchResults: async (params) => {
    try {
      const response = await axios.get("/store/search/results", { params });
      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
};

export default StoreAPI;
