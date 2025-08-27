import axios from "../axiosInstance.js"

const OrderAPI = {
    getUserOrders: async () => {
        return axios.get("/user/orders")
    },
    getOrderDetails: async (orderId) => {
        return axios.get(`/user/orders/${orderId}`)
    },
    cancelOrder: async (orderId, reason) => {
        return axios.patch(`/users/orders/${orderId}/cancel`, {reason})
    }
}

export default OrderAPI