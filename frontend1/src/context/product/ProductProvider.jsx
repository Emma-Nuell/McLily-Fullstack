import React, { useReducer } from "react";
import reducer from "../../reducers/product-reducer";
import {
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
  ACTIVE_SUBLINK,
  ADD_PRODUCTS,
  CLEAR_PRODUCTS,
  UPDATE_PRODUCT,
} from "../../actions";
// import { products } from "../convert/products1.js";
import PropTypes from "prop-types";
import ProductsContext from "./ProductContext.jsx";

const initialState = {
  isSidebarOpen: false,
  activeLink: null,
  products: {},
  featuredProducts: [],
  single_product: [],
};


export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  const changeLink = (name) => {
    dispatch({
      type: ACTIVE_SUBLINK,
      payload: state.activeLink === name ? null : name,
    });
  };


  const addProducts = (product) => {
    dispatch({ type: ADD_PRODUCTS, payload: product})
  }

  const updateProduct = (product) => {
    dispatch({ type: UPDATE_PRODUCT, payload: product})
  }

  const clearProducts = () => {
    dispatch({ type: CLEAR_PRODUCTS})
  }

  const getProduct = (productId) => {
    
    return state.products[productId] || null
  }

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        changeLink,
        addProducts,
        updateProduct,
        clearProducts,
        getProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
    children: PropTypes.node,
}

export default ProductsProvider

