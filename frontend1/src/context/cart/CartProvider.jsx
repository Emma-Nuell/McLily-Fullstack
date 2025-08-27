import React, { useEffect, useReducer } from "react";
import reducer from "../../reducers/cart-reducer";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  SET_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  SET_ERROR_CART,
  SET_LOADING_CART,
  MERGE_CART,
} from "../../actions";
import PropTypes from "prop-types";
import CartContext from "./CartContext";
import {
  useAddToCart,
  useSyncCart,
  useUpdateCart,
  useRemoveCart,
  useCart,
} from "../../hooks/cartHooks";
import useUserContext from "../user/useUserContext";

const CART_STORAGE_KEY = "ecommerce_cart";
const GUEST_ID_KEY = "guest_id";

const getGuestId = () => {
  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  return guestId;
};

const initialState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  error: null,
  isLoading: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, user } = useUserContext();
  const { data: backendCartData, refetch: refetchBackendCart } = useCart();
  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveCart();
  const updateCartMutation = useUpdateCart();
  const syncCartMutation = useSyncCart();

  // load cart from storage
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          dispatch({ type: SET_CART, payload: cartData.items || [] });
        }
      } catch (error) {
        console.error("Error loading cart from storage: ", error);
      }
    };
    loadCartFromStorage();
  }, []);

  // save cart to localstorage whenever it changes
  useEffect(() => {
    const saveCartToStorage = () => {
      try {
        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify({
            cart: state.cart,
            guestId: getGuestId(),
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error("Error saving cart to storage: ", error);
      }
    };
    saveCartToStorage();
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  // sync cart with backend when user is authenticated
  useEffect(() => {
    const syncCartWithBackend = async () => {
      if (isAuthenticated && user) {
        dispatch({ type: SET_LOADING_CART, payload: true });

        try {
          const localCart = state.cart;
          if (localCart.length > 0) {
            await syncCartMutation.mutateAsync(localCart);

            await refetchBackendCart();

            if (backendCartData?.data?.cart) {
              const backendCart = backendCartData.data.cart.map((item) => ({
                cartId: item.size
                  ? `${item.productId}_${item.size}`
                  : item.productId,
                productId: item.productId,
                quantity: item.quantity,
                size: item.size || null,
                max: item.productId.stock,
              }));

              dispatch({
                type: MERGE_CART,
                payload: { localCart, backendCart },
              });
            }
          } else {
            await refetchBackendCart();
          }
        } catch (error) {
          console.error("Error syncing cart with backend: ", error);
          dispatch({ type: SET_ERROR_CART, payload: error.message });
        } finally {
          dispatch({ type: SET_LOADING_CART, payload: false });
        }
      }
    };

    syncCartWithBackend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const addToCart = async (size = null, quantity, product) => {
    dispatch({ type: ADD_TO_CART, payload: { size, quantity, product } });
    const maxStock = size ? size.stock : product.stock;

    if (isAuthenticated) {
      try {
        await addToCartMutation.mutateAsync({
          productId: product.productId,
          size: size ? size.value : null,
          quantity: Math.min(quantity, maxStock),
        });
      } catch (error) {
        console.error("Error syncing to backend: ", error);
      }
    }
  };

  const removeItem = async(cartId) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: cartId });
    const item = state.cart.find((item) => item.cartId === cartId);
    if (!item) return;

    if (isAuthenticated && item) {
      try {
        await removeFromCartMutation.mutateAsync({
          productId: item.productId,
          size: item.size
        })
      }
      catch (error) {
        console.error('Error syncing to backend: ', error);
        
      }
    }
  };
  const toggleAmount = async (cartId, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { cartId, value } });
    const item = state.cart.find((item) => item.cartId === cartId);
    if (!item) return;

    let newQuantity;
    if (value === "inc") {
      newQuantity = item.quantity + 1;
      if (newQuantity > item.max) {
        newQuantity = item.max;
      }
    }
    if (value === "dec") {
      newQuantity = item.quantity - 1;
      if (newQuantity < 1) {
        newQuantity = 1;
      }
    }

    if (isAuthenticated) {
      try {
        await updateCartMutation.mutateAsync({
          productId: item.productId,
          size: item.size,
          quantity: newQuantity,
        });
      } catch (error) {
        console.error("Error syncing to backend:", error);
      }
    }
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
    if (isAuthenticated) {
      try {
        console.log('cart cleared');
        
      } catch (error) {
        console.error('Error syncing to backend: ', error);
        
      }
    }
  };

  // useEffect(() => {
  //   dispatch({ type: COUNT_CART_TOTALS });
  //   localStorage.setItem("cart", JSON.stringify(state.cart));
  // }, [state.cart]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
        refetch: refetchBackendCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};
