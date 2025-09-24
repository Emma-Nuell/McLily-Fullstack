import axios from "../axiosInstance.js";

const UserProfileAPI = {
  signUp: async (userData) => {
     try {
       const response = await axios.post("/account/signup", userData);
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  signIn: async (userData) => {
     try {
       const response = await axios.post("/account/login", userData);
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  updateUserProfile: async (profileData) => {
     try {
       const response = await axios.patch("/account/update", profileData);
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  changePassword: async (passwordData) => {
     try {
       const response = await axios.patch("/account/change-password", passwordData);
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  getUserProfile: async () => {
     try {
       const response = await axios.get("/account/profile");
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  getUserAddresses: async () => {
     try {
       const response = await axios.get("/account/addresses");
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  addUserAddress: async (addressData) => {
     try {
       const response = await axios.post("/account/addresses/new", addressData);
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  updateUserAddress: async (addressId, addressData) => {
     try {
       const response = await axios.put(`/account/addresses/update/${addressId}`, addressData);
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  deleteUserAddress: async (addressId) => {
     try {
       const response = await axios.delete(`/account/addresses/delete/${addressId}`);
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
  setDefaultAddress: async (addressId) => {
     try {
       const response = await axios.patch(`/account/addresses/default/${addressId}`);
       return response.data;
     } catch (error) {
       console.error("An Error occured:", error);
     }
  },
};

export default UserProfileAPI;
