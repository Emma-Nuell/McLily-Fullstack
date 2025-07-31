import AuthContext from "./AuthContext";
import auth_reducer from "../../reducers/auth-reducer";
import React, { useEffect, useReducer } from "react";
// import axios from "../../lib/axiosInstance.js";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_ERROR,
  LOGOUT,
} from "../../actions";

const initialState = {
  isAuthenticated: !!localStorage.getItem("adminToken"),
  admin: JSON.parse(localStorage.getItem("adminData") || "null"),
  token: localStorage.getItem("adminToken"),
  loading: false,
  error: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth_reducer, initialState);

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     const token = localStorage.getItem("adminToken");
  //     const adminData = localStorage.getItem("adminData");

  //     if (token && adminData) {
  //       try {
  //         const admin = JSON.parse(adminData);
  //         dispatch({ type: LOGIN_SUCCESS, payload: { admin, token } });
  //       } catch (error) {
  //         console.error("Error parsing admin data", error);
  //         localStorage.removeItem("adminToken");
  //         localStorage.removeItem("adminData");
  //       }
  //     }
  //   };

  //   checkAuthStatus();
  // }, []);

  const login = async (email, password) => {
    dispatch({ type: LOGIN_START });

    try {
      const response = await axios.post("/admin/login", { email, password });
      const data = response.data;
      

      if (!(response.status >= 200 && response.status < 300)) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminData", JSON.stringify(data.admin));

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { admin: data.admin, token: data.token },
      });

      return data;
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload:
          error.response?.data?.message || "Login failed. Please try again",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (token) {
        await axios.post(
          "/admin/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");

      dispatch({ type: LOGOUT });
    }
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  const verifyAdminRole = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return false;
      try {
          const response = await axios.get("/admin/verify", {
              headers: {
                Authorization: `Bearer ${token}`
            },
          })
          if (!(response.status >= 200 && response.status < 300)) {
            throw new Error(response.message || "Login failed");
          }
          return true
      } catch (error) {
          console.error("Admin verification failed", error);
          logout()
          return false;   
    }
    };
    
    const value = {
        ...state, 
        login,
        logout,
        clearError,
        verifyAdminRole,
    }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
