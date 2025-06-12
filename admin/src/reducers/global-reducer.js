import {
  CLEAR_GLOBAL_SEARCH,
  GLOBAL_SEARCH,
  SET_SEARCH_LOADING,
  SHOW_RESULTS,
} from "../actions";

const global_reducer = (state, action) => {
  if (action.type === SET_SEARCH_LOADING) {
    return { ...state, loading: action.payload };
  }
  if (action.type === GLOBAL_SEARCH) {
    const { products, orders, value } = action.payload;
    const searchTerm = value.toLowerCase();

    const matchingProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.id.toString().includes(searchTerm) ||
        product.category.includes(searchTerm) ||
        product.subCategory.toLowerCase().includes(searchTerm)
    );

    const matchingOrders = orders.filter(
      (order) =>
        order.orderId.toString().toLowerCase().includes(searchTerm) ||
        order.customerName.toLowerCase().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm) ||
        order.orderDate.toLowerCase().includes(searchTerm)
    );

    return {
      ...state,
      results: { products: matchingProducts, orders: matchingOrders },
      searchTerm: searchTerm,
      hasSearched: true,
      loading: false,
    };
  }
  if (action.type === CLEAR_GLOBAL_SEARCH) {
    return {
      ...state,
      searchTerm: "",
      results: { products: [], orders: [] },
      hasSearched: false,
      showResults: false,
    };
  }
  if (action.type === SHOW_RESULTS) {
    return { ...state, showResults: action.payload };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default global_reducer;
