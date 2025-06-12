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
} from "../actions";

const products_reducer = (state, action) => {
  if (action.type === DELETE_PRODUCT) {
    return { ...state, products: action.payload };
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
  if (action.type === GET_PRODUCTS_SUCCESS) {
    return { ...state, products: action.payload, filteredProducts: action.payload };
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
  if (action.type === REMOVE_FEATURED) {
    const updatedProducts = state.products.map((product) => {
      if (product.id === action.payload) {
        return { ...product, featured: false };
      }
      return product;
    });
    return { ...state, products: updatedProducts };
  }
  if (action.type === ADD_FEATURED) {
    const updatedProducts = state.products.map((product) => {
      if (product.id === action.payload) {
        return { ...product, featured: true };
      }
      return product;
    });
    return { ...state, products: updatedProducts };
  }
  if (action.type === SEARCH_PRODUCTS) {
    const searchTerm = action.payload.toLowerCase();
    const filteredProducts = state.products.filter(product => product.name.toLowerCase().includes(searchTerm) || product.id.toString().includes(searchTerm) || product.category.includes(searchTerm) || product.subCategory.toLowerCase().includes(searchTerm));
    return {
      ...state, filteredProducts: filteredProducts, searchTerm: searchTerm
    }
  }
  if (action.type === CLEAR_SEARCH_PRODUCTS) {
    return {...state, filteredProducts: state.products, searchTerm: ""}
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
