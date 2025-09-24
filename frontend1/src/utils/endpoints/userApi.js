import axios from "../axiosInstance.js";

const UserAPI = {
    getWishlist: async () => {
        try {
             const response = await axios.get("/user/wishlist")
             return response.data;
         } catch (error) {
           console.error("An Error occured:", error);
         }
    },
    addToWishlist: async (productId) => {
         try {
             const response = await axios.post("/user/wishlist/add", {productId})
             return response.data;
         } catch (error) {
           console.error("An Error occured:", error);
         }
    },
    removeFromWishlist: async (productId) => {
         try {
             const response = await axios.delete(`/user/wishlist/remove/${productId}`)
             return response.data;
         } catch (error) {
           console.error("An Error occured:", error);
         }
    },
    checkWishlist: async (productId) => {
         try {
             const response = await axios.get(`/user/wishlist/check/${productId}`)
             return response.data;
         } catch (error) {
           console.error("An Error occured:", error);
         }
    },
    checkCanReview: async (productId) => {
         try {
             const response = await axios.get(`/user/reviews/can-review/${productId}`)
             return response.data;
         } catch (error) {
           console.error("An Error occured:", error);
         }
    },
    getPendingReviews: async () => {
         try {
             const response = await axios.get("/user/reviews/pending")
             return response.data;
         } catch (error) {
           console.error("An Error occured:", error);
         }
    },
    getUserReviews: async () => {
         try {
             const response = await axios.get(`/user/reviews/my-reviews`)
             return response.data;
         } catch (error) {
           console.error("An Error occured:", error);
         }
    },
    getUserAllReviews: async () => {
         try {
             const response = await axios.get(`/user/reviews/all-reviews`)
             return response.data;
         } catch (error) {
           console.error("An Error occured:", error);
         }
    },

}

export default UserAPI