import React, { useCallback, useEffect, useReducer } from "react";
import products_reducer from "../../reducers/products-reducer.js";
import ProductsContext from "./ProductContext";
import {
  EDIT_PRODUCT,
  LOW_STOCK,
  GET_PRODUCTS_SUCCESS,
  TOP_PRODUCTS,
  BEST_SELLERS,
  EDIT_ON,
  EDIT_OFF,
  DELETE_PRODUCT,
  ADD_FEATURED,
  REMOVE_FEATURED,
  GET_FEATURED_PRODUCTS
} from "../../actions";
import { productsDetails, } from "../../lib/constants.jsx";

const initialState = {
  products: [],
  editProductData: {},
  isEditMode: false,
  lowStock: [],
  featuredProducts: [],
  bestSellers: [],
  topProducts: [],
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(products_reducer, initialState);

  const fetchProducts = () => {
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: productsDetails });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getFeaturedProducts = useCallback(() => {
    dispatch({ type: GET_FEATURED_PRODUCTS, payload: state.products });
  }, [state.products, dispatch]);

  const deleteProduct = (id) => {
    const updatedProducts = state.products.filter((product) => product.id !== id);
    dispatch({ type: DELETE_PRODUCT, payload: updatedProducts });
  }

  const addFeatured = (id) => {
    dispatch({ type: ADD_FEATURED, payload: id });
  }

  const removeFeatured = (id) => {
    dispatch({ type: REMOVE_FEATURED, payload: id });
  }

  const editProduct = (productData) => {
    dispatch({ type: EDIT_PRODUCT, payload: productData });
  }

  const editOn = () => {
    dispatch({type: EDIT_ON})
  }

  const editOff = () => {
    dispatch({ type: EDIT_OFF})
  }

const lowStockProducts = useCallback(() => {
  dispatch({ type: LOW_STOCK, payload: state.products });
}, [state.products, dispatch]);
  
const bestSellers = useCallback(() => {
  dispatch({ type: BEST_SELLERS, payload: state.products });
}, [state.products, dispatch]);

const topProducts = useCallback(() => {
  dispatch({ type: TOP_PRODUCTS, payload: state.products });
}, [state.products, dispatch]);


  useEffect(() => {
    getFeaturedProducts()
    lowStockProducts()
    bestSellers()
    topProducts()
  }, [state.products, lowStockProducts, bestSellers, topProducts, getFeaturedProducts]);
  
  
  
  

  return (
    <ProductsContext.Provider value={{ ...state, editProduct, editOff, editOn, deleteProduct, addFeatured, removeFeatured }}> 
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
