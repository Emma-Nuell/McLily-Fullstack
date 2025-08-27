import React, {  useEffect, useReducer } from "react";
import reducer from "../reducers/user-reducer";
// import { useCartContext } from "./cart-context";
// import axios from "axios";
import PropTypes from "prop-types";
import UserContext from "./UserContext";
import { useAddToWishlist, useRemoveFromWishlist, useSignIn, useSignOut, useSignUp, useWishlist } from "../../hooks/userHooks";
import { SET_USER, SET_LOADING_USER, CLEAR_USER, SET_ERROR_USER, SET_ERROR_WISHLIST, SET_LOADING_WISHLIST, ADD_ITEM_WISHLIST, REMOVE_ITEM_WISHLIST, SET_WISHLIST } from "../../actions";

const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  wishlistItems: [],
  isLoadingWishlist: false,
  errorWishlist: null
};


export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const signUpMutation = useSignUp();
  const signInMutation = useSignIn();
  const signOutMutation = useSignOut();
  const { data: wishlistData, isLoading: wishlistIsLoading, error: wishlistError } = useWishlist()
  const addMutation = useAddToWishlist()
  const removeMutation = useRemoveFromWishlist()

    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          const profile = localStorage.getItem("profile");
          if (profile) {
            const userData = JSON.parse(profile);
            dispatch({ type: SET_USER, payload: userData.user });
          } else {
            dispatch({ type: CLEAR_USER });
          }
        } catch (error) {
          console.error("Error checking auth status:", error);
          dispatch({ type: CLEAR_USER });
        }
      };

      checkAuthStatus();
    }, []);

    useEffect(() => {
      if (wishlistData?.data?.wishlist) {
        dispatch({ type: "SET_WISHLIST", payload: wishlistData.data.wishlist });
      }
    }, [wishlistData]);

      const signIn = async (credentials) => {
        dispatch({ type: SET_LOADING_USER, payload: true });
        dispatch({ type: SET_ERROR_USER, payload: null });

        try {
          const response = await signInMutation.mutateAsync(credentials);
          dispatch({ type: SET_USER, payload: response.data.user });
          return response;
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Login failed";
          dispatch({ type: SET_ERROR_USER, payload: errorMessage });
          throw error;
        }
  };
  
    const signUp = async (userData) => {
      dispatch({ type: SET_LOADING_USER, payload: true });
      dispatch({ type: SET_ERROR_USER, payload: null });

      try {
        const response = await signUpMutation.mutateAsync(userData);
        dispatch({ type: SET_USER, payload: response.data.user });
        return response;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Registration failed";
        dispatch({ type: SET_ERROR_USER, payload: errorMessage });
        throw error;
      }
  };
  
    const signOut = async () => {
      try {
        await signOutMutation.mutateAsync();
        dispatch({ type: CLEAR_USER });
      } catch (error) {
        console.error("Error signing out:", error);
      }
  };

    const addToWishlist = async (productId) => {
      try {
        dispatch({ type: SET_LOADING_WISHLIST, payload: true });
        await addMutation.mutateAsync(productId);
      } catch (error) {
        dispatch({ type: SET_ERROR_WISHLIST, payload: error.message });
      }
  };
  
    const removeFromWishlist = async (productId) => {
      try {
        dispatch({ type: SET_LOADING_WISHLIST, payload: true });
        await removeMutation.mutateAsync(productId);
      } catch (error) {
        dispatch({ type: SET_ERROR_WISHLIST, payload: error.message });
      }
  };
  
    const isInWishlist = (productId) => {
      return state.wishlistItems.some((item) => item.productId === productId);
    };

  
  const value = {
    ...state,
    signIn,
    signUp,
    signOut,
    isSigningIn: signInMutation.isLoading,
    isSigningUp: signUpMutation.isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistIsLoading: state.isLoadingWishlist || wishlistIsLoading,
    wishlistError: state.errorWishlist || wishlistError
  }



  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
    children: PropTypes.node,
}

