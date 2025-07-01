import {
  EDIT_PRODUCT,
  GET_PRODUCTS_SUCCESS,
  LOW_STOCK,
  TOP_PRODUCTS,
  BEST_SELLERS,
  EDIT_OFF,
  EDIT_ON,
  DELETE_PRODUCT,
  REMOVE_FEATURED,
  ADD_FEATURED,
  GET_FEATURED_PRODUCTS,
  SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS,
  GET_PRODUCTS_START,
  GET_PRODUCTS_ERROR,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  TOGGLE_FEATURED,
} from "../actions";

const products_reducer = (state, action) => {
  if (action.type === GET_PRODUCTS_START) {
    return {...state, loading: true, error: null}
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return {...state, loading: false, error: action.payload}
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products: action.payload,
      loading: false
    };
  }
  if (action.type === CREATE_PRODUCT) {
    return {...state, products: [action.payload, ...state.products]}
  }
  if (action.type === UPDATE_PRODUCT) {
    return {
      ...state,
      products: state.products.map((p) =>
        p.productId === action.payload.productId ? action.payload : p
      ),
    };
  }
  if (action.type === DELETE_PRODUCT) {
    return {
      ...state,
      products: state.products.filter((p) => p.productId !== action.payload),
    };
  }
  if (action.type === GET_FEATURED_PRODUCTS) {
    const featuredProducts = action.payload.filter(
      (products) => products.featured === true
    );
    return { ...state, featuredProducts: featuredProducts };
  }
  if (action.type === EDIT_PRODUCT) {
    return { ...state, editProductData: action.payload };
  }
  if (action.type === EDIT_ON) {
    return { ...state, isEditMode: true };
  }
  if (action.type === EDIT_OFF) {
    return { ...state, isEditMode: false, editProductData: {} };
  }
  
  if (action.type === LOW_STOCK) {
    const lowStock = action.payload.filter((p) => Number(p.stock) <= 10);
    return { ...state, lowStock: lowStock };
  }
  if (action.type === BEST_SELLERS) {
    const bestSellers = [...action.payload]
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);
    return { ...state, bestSellers: bestSellers };
  }
  if (action.type === TOP_PRODUCTS) {
    const topProducts = [...action.payload]
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);
    return { ...state, topProducts: topProducts };
  }
  if (action.type === TOGGLE_FEATURED) {
    return {
      ...state,
      products: state.products.map((p) =>
        p.productId === action.payload.id
          ? { ...p, featured: action.payload.featured }
          : p
      ),
    };
  }
  if (action.type === REMOVE_FEATURED) {
    const updatedProducts = state.products.map((product) => {
      if (product.productId === action.payload) {
        return { ...product, featured: false };
      }
      return product;
    });
    return { ...state, products: updatedProducts };
  }
  if (action.type === ADD_FEATURED) {
    const updatedProducts = state.products.map((product) => {
      if (product.productId === action.payload) {
        return { ...product, featured: true };
      }
      return product;
    });
    return { ...state, products: updatedProducts };
  }
  if (action.type === SEARCH_PRODUCTS) {
    return {
      ...state,
      searchTerm: action.payload,
    };
  }
  if (action.type === CLEAR_SEARCH_PRODUCTS) {
    return {...state,  searchTerm: ""}
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
