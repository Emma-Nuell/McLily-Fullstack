import AuthContext from "./AuthContext";
import auth_reducer from "../../reducers/auth-reducer";
import React, { useReducer } from "react";
// import axios from "../../lib/axiosInstance.js";
// import {
//   LOGIN_START,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   CLEAR_ERROR,
//   LOGOUT,
// } from "../../actions";
import PropTypes from "prop-types";


const initialState = {
  isAuthenticated: !!localStorage.getItem("adminToken"),
  admin: JSON.parse(localStorage.getItem("adminData") || "null"),
  token: localStorage.getItem("adminToken"),
  loading: false,
  error: null,
};

const AuthProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(auth_reducer, initialState);

 

  // const login = async (email, password) => {
  //   dispatch({ type: LOGIN_START });

  //   try {
  //     const response = await axios.post("/admin/login", { email, password });
  //     const data = response.data;
      

  //     if (!(response.status >= 200 && response.status < 300)) {
  //       throw new Error(data.message || "Login failed");
  //     }

  //     localStorage.setItem("adminToken", data.token);
  //     localStorage.setItem("adminData", JSON.stringify(data.admin));

  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: { admin: data.admin, token: data.token },
  //     });

  //     return data;
  //   } catch (error) {
  //     dispatch({
  //       type: LOGIN_FAILURE,
  //       payload:
  //         error.response?.data?.message || "Login failed. Please try again",
  //     });
  //     throw error;
  //   }
  // };

  // const logout = async () => {
  //   try {
  //     const token = localStorage.getItem("adminToken");
  //     if (token) {
  //       await axios.post(
  //         "/admin/logout",
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Logout failed", error);
  //   } finally {
  //     localStorage.removeItem("adminToken");
  //     localStorage.removeItem("adminData");

  //     dispatch({ type: LOGOUT });
  //   }
  // };

  // const clearError = () => {
  //   dispatch({ type: CLEAR_ERROR });
  // };

  // const verifyAdminRole = async () => {
  //   const token = localStorage.getItem("adminToken");
  //   if (!token) return false;
  //     try {
  //         const response = await axios.get("/admin/verify", {
  //             headers: {
  //               Authorization: `Bearer ${token}`
  //           },
  //         })
  //         if (!(response.status >= 200 && response.status < 300)) {
  //           throw new Error(response.message || "Login failed");
  //         }
  //         return true
  //     } catch (error) {
  //         console.error("Admin verification failed", error);
  //         logout()
  //         return false;   
  //   }
  //   };
    
  //   const value = {
  //       ...state, 
  //       login,
  //       logout,
  //       clearError,
  //       verifyAdminRole,
  //   }

  return (
    <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;
