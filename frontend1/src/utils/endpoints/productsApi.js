import axios from "../axiosInstance";
import { getLastViewedProducts } from "../helpers";

const ProductsAPI = {
  getHomepageData: async (userPreferences = {}) => {
    return axios.post("/user/homepage", {
      preferences: userPreferences,
      lastViewed: getLastViewedProducts().map((item) => item.productId),
    });
  },
  getRecommendedProducts: async (preferences) => {
    return axios.post("/user/recommended", { preferences})
  },
  trackVisit: async (productId) => {
    return axios.post("/product/track-visit", {productId})
  },
  getFilteredProducts: async (filters) => {
    return axios.get("/user/filter", { params: filters})
  },
  getFilterOptions: async (category, subCategory) => {
    return axios.get("/user/filter-options", {
      params: {category, subCategory}
    })
  },
  getProductsInfinite: async ({ pageParam = 1, ...filters }) => {
    const response = await axios.get("/user/filter", {
      params: { ...filters, page: pageParam}
    })
    return response.data
  }, 
  fetchProduct: async (productId) => {
    return axios.get(`/products/${productId}`)
  },
  getSearchSuggestions: async (query, limit = 5) => {
    return axios.get("/search/suggestions", {params: {q: query, limit}})
  },
  getSearchResults: async (params) => {
    return axios.get("/seacrh", {params})
  },
  getSearchFilters: async (searchQuery) => {
    return axios.get("/search/filters", {params: {q: searchQuery}})
  },
};

export default ProductsAPI;
