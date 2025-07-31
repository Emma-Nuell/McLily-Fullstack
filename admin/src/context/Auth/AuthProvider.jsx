import AuthContext from "./AuthContext";
import auth_reducer from "../../reducers/auth-reducer";
import { useEffect, useReducer } from "react";
import axios from "../../lib/axiosInstance.js";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_ERROR,
  LOGOUT,
} from "../../actions";
import { useState } from "react";

const initialState = {
  isAuthenticated: !!localStorage.getItem("adminToken"),
  admin: JSON.parse(localStorage.getItem("adminData") || "null"),
  token: localStorage.getItem("adminToken"),
  loading: false,
  error: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth_reducer, initialState);
  const [isValidatingToken, setIsValidatingToken] = useState(false);
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("adminToken");
      const adminData = localStorage.getItem("adminData");

      if (token && adminData) {
        try {
          const admin = JSON.parse(adminData);
          dispatch({ type: LOGIN_SUCCESS, payload: { admin, token } });
        } catch (error) {
          console.error("Error parsing admin data", error);
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminData");
        }
      }
    };

    checkAuthStatus();
  }, []);

  const isAuthenticated = () => {
    return !!state.token && !!state.admin;
  };

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
  setAuthChecked(true);
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
            timeout: 7000,
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

    if (!isAuthenticated()) return false;
    try {
      setIsValidatingToken(true);
      const response = await axios.get("/admin/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      console.error("Admin verification failed", error);
      logout();
      return false;
    } finally {
      setIsValidatingToken(false);
    }
  };

  const value = {
    ...state,
    login,
    logout,
    clearError,
    verifyAdminRole,
    isAuthenticated,
    authChecked,
    setAuthChecked,
    loading: state.loading || isValidatingToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
