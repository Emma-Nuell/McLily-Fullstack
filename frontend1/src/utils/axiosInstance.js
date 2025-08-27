import axios from "axios";
import { getToken } from "./auth";

const api = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: api,
  timeout: 7000, // 20s timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth tokens
instance.interceptors.request.use(
  (config) => {
    const token = getToken(); // Get from localStorage/cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
// instance.interceptors.response.use(
//   (response) => response.data, // Directly return data
//   (error) => {
//     const handledError = {
//       message: error.response?.data?.message || "An error occurred",
//       status: error.response?.status,
//       data: error.response?.data,
//     };

//     // Special handling for common status codes
//     switch (error.response?.status) {
//       case 401:
//         // Trigger logout logic
//         break;
//       case 403:
//         // Redirect to unauthorized page
//         break;
//       case 429:
//         // Handle rate limiting
//         break;
//       default:
//         console.error("API Error:", handledError);
//     }

//     return Promise.reject(handledError);
//   }
// );

// Add progress tracking for file uploads
// instance.defaults.onUploadProgress = (progressEvent) => {
//   const percentCompleted = Math.round(
//     (progressEvent.loaded * 100) / progressEvent.total
//   );
//   // Dispatch to store or context
// };

export default instance;
