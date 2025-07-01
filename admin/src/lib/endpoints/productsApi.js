import axios from "../axiosInstance"

const ProductsAPI = {
   getAll: async () => {
    return axios.get("/admin/products")
    },
    create: async (productData) => {
        return axios.post("/admin/products", productData)
    },
    update: async (id, productData) => {
        return axios.patch(`/admin/products/${id}`, productData)
    },
    delete: async (id) => {
        return axios.delete(`/admin/products/${id}`)
    },
    toggleFeatured: async (id, featuredStatus) => {
        return axios.patch(`/admin/products/${id}/featured`, {featured: featuredStatus})
    }
}

export default ProductsAPI