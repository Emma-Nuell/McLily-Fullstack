import React, { useCallback, useEffect, useReducer } from "react";
import products_reducer from "../../reducers/products-reducer.js";
import ProductsContext from "./ProductContext";
import {
  EDIT_PRODUCT,
  RECENT_ORDERS,
  LOW_STOCK,
  PENDING_ORDERS,
  GET_PRODUCTS_SUCCESS,
  TOP_PRODUCTS,
  BEST_SELLERS,
  GET_SINGLE_ORDER_SUCCESS,
  GET_ORDERS_SUCCESS,
  COMPLETED_ORDERS,
} from "../../actions";
import { productsDetails, sampleOrderData } from "../../lib/constants.jsx";

const initialState = {
  products: [],
  orders: [],
  isEditMode: false,
  recentOrders: [],
  lowStock: [],
  pendingOrders: [],
  completedOrders: [],
  featuredProducts: [],
  bestSellers: [],
  topProducts: [],
  singleOrder: [],
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(products_reducer, initialState);

  const editOn = () => {
    dispatch({ type: EDIT_PRODUCT });
  };

  const fetchProducts = () => {
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: productsDetails });
  };
  const fetchOrders = () => {
    dispatch({ type: GET_ORDERS_SUCCESS, payload: sampleOrderData });
  }
  const lowStockProducts = () => {
    dispatch({type: LOW_STOCK, payload: productsDetails})
  }
  const pendingOrders = () => {
    dispatch({type: PENDING_ORDERS, payload: sampleOrderData})
  }
  const completedOrders = () => {
    dispatch({type: COMPLETED_ORDERS, payload: sampleOrderData})
  }
  const recentOrders = () => {
    dispatch({type: RECENT_ORDERS, payload: sampleOrderData})
  }
  const bestSellers = () => {
    dispatch({type: BEST_SELLERS, payload: productsDetails})
  }
  const topProducts = () => {
    dispatch({type: TOP_PRODUCTS, payload: productsDetails})
  }

  useEffect(() => {
    fetchProducts();
    fetchOrders()
  }, []);

  const fetchSingleOrder = useCallback(
    (id) => {
      const singleOrder = sampleOrderData.find((order) => order.orderId === id);
      dispatch({ type: GET_SINGLE_ORDER_SUCCESS, payload: singleOrder });
    },
    [dispatch]
  );

  useEffect(() => {
    lowStockProducts()
    pendingOrders()
    recentOrders()
    bestSellers()
    topProducts()
    completedOrders()
  }, [])
  
  
  
  

  return (
    <ProductsContext.Provider value={{ ...state, editOn, fetchSingleOrder, }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
