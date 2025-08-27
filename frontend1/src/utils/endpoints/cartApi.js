import axios from "../axiosInstance.js"

const CartAPI = {
    getCart: async () => {
        return axios.get("/user/cart")
    },
    addToCart: async ({productId, size, quantity}) => {
        return axios.post("/user/cart/add", {productId, size, quantity})
    },
    removeFromCart: async ({productId, size}) => {
        return axios.delete("/user/cart/remove", {data: {productId, size}})
    },
    updateCart: async ({productId, size, quantity}) => {
        return axios.patch("/user/cart/update", {productId, size, quantity})
    },
    syncCart: async (cartItems) => {
        return axios.post("/user/cart/sync", {items: cartItems})
    },
    clearCart: async () => {
        return axios.delete("/user/cart/clear")
    },
}

export default CartAPI