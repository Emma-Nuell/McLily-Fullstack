import axios from "../axiosInstance.js";

const UserAPI = {
    signUp: async (userData) => {
        return axios.post("/account/signup", userData)
    },
    signIn: async (userData) => {
        return axios.post("/account/login", userData)
    },
    updateProfile: async (userData) => {
        return axios.patch("/account/update", userData)
    },
    changePassword: async (passwordData) => {
        return axios.patch("/account/changepassword", passwordData)
    },
    getWishlist: async () => {
        return axios.get("/wishlist")
    },
    addToWishlist: async (productId) => {
        return axios.post("/wishlist/add", {productId})
    },
    removeFromWishlist: async (productId) => {
        return axios.delete(`/wishlist/remove/${productId}`)
    },
    checkWishlist: async (productId) => {
        return axios.get(`/wishlist/check/${productId}`)
    },

}

export default UserAPI