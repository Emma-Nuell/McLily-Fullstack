import axios from "../axiosInstance"

const OrdersAPI = {
    getAll: async () => {
        return axios.get("/admin/orders")
    },
    
    delete: async (id) => {
        return axios.delete(`/admin/orders/${id}`)
    },

    changeStatus: async (id, newStatus) => {
        return axios.patch(`/admin/orders/${id}/status`, {status: newStatus})
    }

}

export default OrdersAPI