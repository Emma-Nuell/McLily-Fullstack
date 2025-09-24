import axios from "../axiosInstance";

const ProductsAPI = {
  trackVisit: async (productId) => {
     try {
       const response = await axios.post("/product/track-visit", {productId})
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  submitReview: async (reviewData) => {
     try {
       const response = await axios.post("/product/reviews/submit", reviewData)
       return response.data
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  updateReview: async (productId, reviewData) => {
     try {
       const response = await axios.put(`/product/reviews/update/${productId}`, reviewData)
       return response.data
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  deleteReview: async (productId) => {
     try {
       const response = await axios.delete(`/product/reviews/delete/${productId}`)
       return response.data
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
};

export default ProductsAPI;
