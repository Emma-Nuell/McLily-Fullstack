import React, { useCallback, useEffect, useReducer } from "react";
import products_reducer from "../../reducers/products-reducer.js";
import ProductsContext from "./ProductContext";
import { useToast } from "../Modal/useModal&Toast.js";
import {ProductsAPI} from "../../lib/endpoints/index.js"
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
  GET_FEATURED_PRODUCTS,
  SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS,
  GET_PRODUCTS_START,
  GET_PRODUCTS_ERROR,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  TOGGLE_FEATURED,
} from "../../actions";

const initialState = {
  products: [],
  editProductData: {},
  isEditMode: false,
  lowStock: [],
  featuredProducts: [],
  bestSellers: [],
  topProducts: [],
  loading: false,
  searchTerm: "",
  error: null,
  productToEdit: null,
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(products_reducer, initialState);
    const { showToast, TOAST_TYPES } = useToast();
  

  const fetchProducts = async() => {
    dispatch({ type: GET_PRODUCTS_START });
    try {
      const res = await ProductsAPI.getAll()
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: res.data})
    } catch (error) {
      dispatch({type: GET_PRODUCTS_ERROR, payload: error.message})
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (productData) => {
    try {
      const res = await ProductsAPI.create(productData)
      dispatch({ type: CREATE_PRODUCT, payload: res.data.product })
      console.log(res.data.product);
      showToast("Product created successfully", TOAST_TYPES.SUCCESS);

      
      return {success: true}
    } catch (error) {
      showToast(`Failed to create Product`, TOAST_TYPES.ERROR);
      return {success: false, error: error.message}
    }
  }

  const getFeaturedProducts = useCallback(() => {
    dispatch({ type: GET_FEATURED_PRODUCTS, payload: state.products });
  }, [state.products, dispatch]);

  const deleteProduct = async (id) => {
    try {
     await ProductsAPI.delete(id)
      dispatch({ type: DELETE_PRODUCT, payload: id });
      showToast("Product deleted successfully", TOAST_TYPES.SUCCESS);
      
      
      return {success: true}
    } catch (error) {
      showToast(`Failed to delete Product`, TOAST_TYPES.ERROR);
      return {success: false, error: error.message}
    }
  }

  const addFeatured = (id) => {
    dispatch({ type: ADD_FEATURED, payload: id });
  }

  const removeFeatured = (id) => {
    dispatch({ type: REMOVE_FEATURED, payload: id });
  }

  const toggleFeatured = async (id, currentFeaturedStatus) => {
    const newFeaturedStatus = !currentFeaturedStatus
    try {
      await ProductsAPI.toggleFeatured(id, newFeaturedStatus)
      dispatch({ type: TOGGLE_FEATURED, payload: { id, featured: newFeaturedStatus } })
      showToast("Featured status changed successfully", TOAST_TYPES.SUCCESS);
      
      return { success: true }
      
    } catch (error) {
      showToast(
        `Failed to change Featured status:`,
        TOAST_TYPES.ERROR
      );
      return {success: false, error: error.message}
    }
  }

  const editProduct = (productData) => {
    dispatch({ type: EDIT_PRODUCT, payload: productData });
  }

const updateProduct = async (productData) => {
  try {
    const res = await ProductsAPI.update(productData.productId, productData)
    dispatch({ type: UPDATE_PRODUCT, payload: res.data.data })
    showToast("Product updated successfully", TOAST_TYPES.SUCCESS);
    
  } catch (error) {
    showToast(`Failed to update Product`, TOAST_TYPES.ERROR);
    return {success: false, error: error.message}
  }
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
  
const productSearch = useCallback((value) => {
  dispatch({ type: SEARCH_PRODUCTS, payload: value });
}, []);

     const clearSearch = useCallback(() => {
       dispatch({ type: CLEAR_SEARCH_PRODUCTS });
     }, []);
  
     const filterProducts = (products, searchTerm) => {
       if (!searchTerm) return products;

       const term = searchTerm.toLowerCase();
       return products.filter((product) => {
         return (
           product.name.toLowerCase().includes(term) ||
           product.productId.toString().includes(term) ||
           product.category.toLowerCase().includes(term) ||
           product.subCategory.toLowerCase().includes(term) ||
           product.price.toString().includes(term) ||
           product.tags.some((tag) => tag.toLowerCase().includes(term))
         );
       });
     };



  useEffect(() => {
    getFeaturedProducts()
    lowStockProducts()
    bestSellers()
    topProducts()
  }, [state.products, lowStockProducts, bestSellers, topProducts, getFeaturedProducts]);
  
  
  
  

  return (
    <ProductsContext.Provider value={{ ...state, editProduct, editOff, editOn, deleteProduct, addFeatured, removeFeatured, productSearch, clearSearch, createProduct, updateProduct, toggleFeatured, filterProducts }}> 
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
