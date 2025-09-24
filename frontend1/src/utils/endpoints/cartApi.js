import axios from "../axiosInstance.js";

const CartAPI = {
  getCart: async () => {
    try {
      const response = await axios.get("/user/cart");
      return response.data;
    } catch (error) {
      console.error("An error occured:", error);
    }
  },
  addToCart: async ({ productId, size, quantity }) => {
    try {
      const response = await axios.post("/user/cart/add", {
        productId,
        size,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
  removeFromCart: async ({ productId, size }) => {
    try {
      const response = await axios.delete("/user/cart/remove", {
        data: { productId, size },
      });
      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
  updateCart: async ({ productId, size, quantity }) => {
    try {
      const response = await axios.patch("/user/cart/update", {
        productId,
        size,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
  syncCart: async (cartItems) => {
    try {
      const response = await axios.post("/user/cart/sync", {
        items: cartItems,
      });
      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
  clearCart: async () => {
    try {
      const response = await axios.delete("/user/cart/clear");
      return response.data;
    } catch (error) {
      console.error("An Error occured:", error);
    }
  },
};

export default CartAPI;
