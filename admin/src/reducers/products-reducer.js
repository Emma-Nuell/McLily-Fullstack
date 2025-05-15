import { EDIT_PRODUCT, GET_PRODUCTS_SUCCESS, LOW_STOCK, PENDING_ORDERS, RECENT_ORDERS, TOP_PRODUCTS, BEST_SELLERS, GET_ORDERS_SUCCESS, COMPLETED_ORDERS } from "../actions";

const products_reducer = (state, action) => {
  if (action.type === EDIT_PRODUCT) {
    return { ...state, isEditMode: true };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featuredProducts = action.payload.filter(
      (products) => products.featured === true
    );
    return { ...state, products: action.payload, featuredProducts };
  }
  if (action.type === GET_ORDERS_SUCCESS) {
    return { ...state, orders: action.payload };
  }
  if (action.type === LOW_STOCK) {
    const lowStock = action.payload.filter((p) => Number(p.stock) <= 10);
    return { ...state, lowStock: lowStock };
    }
    if (action.type === RECENT_ORDERS) {
        const recentOrders = [...action.payload].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, 20)
        return {...state, recentOrders: recentOrders}
    }
    if (action.type === BEST_SELLERS) {
        const bestSellers = [...action.payload].sort((a, b) => b.sales - a.sales).slice(0, 10)
        return {...state, bestSellers: bestSellers}
    }
    if (action.type === TOP_PRODUCTS) {
        const topProducts = [...action.payload]
          .sort((a, b) => b.visits - a.visits)
          .slice(0, 10);
        return {...state, topProducts: topProducts}
    }
    if (action.type === PENDING_ORDERS) {
        const pendingOrders = action.payload.filter((o) => ["Pending", "Processing"].includes(o.status))
        return{...state, pendingOrders: pendingOrders}
  }
      if (action.type === COMPLETED_ORDERS) {
          const completedOrders = action.payload.filter((o) => ["Delivered"].includes(o.status))
          return{...state, completedOrders: completedOrders}
    }
  if (action.type === "GET_SINGLE_ORDER_SUCCESS") {
    return { ...state, singleOrder: action.payload };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
