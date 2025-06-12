import {
  CHANGE_STATUS,
  DELETE_ORDER,
  PENDING_ORDERS,
  RECENT_ORDERS,
  GET_ORDERS_SUCCESS,
    COMPLETED_ORDERS,
    GET_SINGLE_ORDER_SUCCESS,
  SEARCH_ORDERS,
  CLEAR_SEARCH_ORDERS,
} from "../actions";

const orders_reducer = (state, action) => {
  if (action.type === GET_ORDERS_SUCCESS) {
    return { ...state, orders: action.payload, filteredOrders: action.payload };
  }

    if (action.type === DELETE_ORDER) {
        return { ...state, orders: action.payload };
    }
    
  if (action.type === RECENT_ORDERS) {
    const recentOrders = [...action.payload]
      .sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      )
      .slice(0, 20);
    return { ...state, recentOrders: recentOrders };
  }
  if (action.type === PENDING_ORDERS) {
    const pendingOrders = action.payload.filter((o) =>
      ["Pending", "Processing"].includes(o.status)
    );
    return { ...state, pendingOrders: pendingOrders };
  }
  if (action.type === COMPLETED_ORDERS) {
    const completedOrders = action.payload.filter((o) =>
      ["Delivered"].includes(o.status)
    );
    return { ...state, completedOrders: completedOrders };
  }
  if (action.type === GET_SINGLE_ORDER_SUCCESS) {
    return { ...state, singleOrder: action.payload };
    }
    if(action.type === CHANGE_STATUS) {
        const {id, newStatus} = action.payload
        return {...state, orders: state.orders.map(order => order.orderId === id ? {...order, status: newStatus} : order)}
  }
  if (action.type === SEARCH_ORDERS) {
    const searchTerm = action.payload.toLowerCase()
    const filteredOrders = state.orders.filter(order => order.orderId.toString().toLowerCase().includes(searchTerm) || order.customerName.toLowerCase().includes(searchTerm) || order.status.toLowerCase().includes(searchTerm) || order.orderDate.toLowerCase().includes(searchTerm));
    return{...state, filteredOrders: filteredOrders, searchTerm: searchTerm}
  }
    if (action.type === CLEAR_SEARCH_ORDERS) {
      return {...state, filteredOrders: state.orders, searchTerm: ""}
    }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default orders_reducer;
