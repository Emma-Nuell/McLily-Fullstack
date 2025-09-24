import axios from "../axiosInstance.js"

const OrderAPI = {
  getUserOrders: async () => {
       try {
        const response = await axios.get("/order/orders");
        return response.data;
       } catch (error) {
         console.error("An Error occured:", error);
       }
    
  },
  getOrderDetails: async (orderId) => {
       try {
        const response = await axios.get(`/order/orders/${orderId}`);
        return response.data;
       } catch (error) {
         console.error("An Error occured:", error);
       }
    
  },
  cancelOrder: async (orderId, reason) => {
     try {
      const response = await axios.patch(`/order/orders/cancel/${orderId}`, {
        reason,
      });
      return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
    
  },
  updateOrderStatus: async (orderId, statusData) => {
     try {
      const response = await axios.patch(
        `/order/orders/status/${orderId}`,
        statusData
      );
      return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
    
  },
  verifyPayment: async (paymentData) => {
     try {
       const response = await axios.post(`/order/verify-payment`, paymentData);
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  createOrder: async (orderData) => {
     try {
       const response = await axios.post("/order/orders/new", orderData);
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  deleteOrder: async (orderId) => {
     try {
       const response = await axios.delete(
         `/order/orders/delete/${orderId}`
       );
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
};

export default OrderAPI