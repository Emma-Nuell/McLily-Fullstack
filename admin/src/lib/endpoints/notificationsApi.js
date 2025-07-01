import axios from "../axiosInstance"

const NotificationAPI = {
    getAll: async (queryParams = {}) => {
        return axios.get("/admin/notifications", {params: queryParams})
    },

    markAsRead: async (id) => {
        return axios.patch(`/admin/notifications/${id}/read`)
    },

    delete: async (id) => {
        return axios.delete(`/admin/notifications/${id}`)
    },

    markAllAsRead: async () => {
        return axios.patch("/admin/notifications/mark-all-as-read")
    }

}

export default NotificationAPI