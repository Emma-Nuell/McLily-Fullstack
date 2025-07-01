import {
  PENDING_ORDERS,
  RECENT_ORDERS,
  GET_ORDERS_SUCCESS,
    COMPLETED_ORDERS,
  GET_SINGLE_ORDER_SUCCESS,
  GET_SINGLE_ORDER_FAIL,
    GET_SINGLE_ORDER_REQUEST,
  SEARCH_ORDERS,
  CLEAR_SEARCH_ORDERS,
  GET_ORDERS_START,
  GET_ORDERS_ERROR,
  DELETE_ORDER_START,
  DELETE_ORDER_ERROR,
  DELETE_ORDER_SUCCESS,
  CHANGE_STATUS_START,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_ERROR,
  CLEAR_ORDERS_ERROR,
} from "../actions";

const orders_reducer = (state, action) => {
  if (action.type === GET_ORDERS_START) {
    return{...state, loading: true, error: null}
  }
  if (action.type === GET_ORDERS_SUCCESS) {
    return { ...state, orders: action.payload.orders, loading: false };
  }
  if (action.type === GET_ORDERS_ERROR) {
    return {...state, error: action.payload}
  }

    if (action.type === DELETE_ORDER_START) {
        return {
          ...state,
          orders: state.orders.filter((o) => o.orderId !== action.payload),
        };
  }
  if (action.type === DELETE_ORDER_ERROR) {
    return {...state, error: action.payload.error, orders: [...state.orders, action.payload.originalOrder]}
  }
  if (action.type === DELETE_ORDER_SUCCESS) {
    return {...state}
  }
    
  if (action.type === RECENT_ORDERS) {
    const orders = Array.isArray(action.payload) ? action.payload : [];
    const recentOrders = [...orders]
      .sort(
        (a, b) =>
          new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime()
      )
      .slice(0, 20);
    return { ...state, recentOrders: recentOrders };
  }
  if (action.type === PENDING_ORDERS) {
    const orders = Array.isArray(action.payload)
      ? action.payload
      : [];
    const pendingOrders = orders.filter((o) =>
      ["Pending", "Processing"].includes(o.orderStatus)
    );
    return { ...state, pendingOrders: pendingOrders };
  }
  if (action.type === COMPLETED_ORDERS) {
    const orders = Array.isArray(action.payload) ? action.payload : [];
    const completedOrders = orders.filter((o) =>
      ["Delivered"].includes(o.orderStatus)
    );
    return { ...state, completedOrders: completedOrders };
  }
  if (action.type === GET_SINGLE_ORDER_REQUEST) {
    const orderId = action.payload;
    const singleOrder = state.orders.find((order) => order.orderId === orderId);

    if (singleOrder) {
      return {
        ...state,
        singleOrder,
        isLoadingSingleOrder: false,
        singleOrderError: null,
      };
    } else {
      return {
        ...state,
        singleOrder: null,
        isLoadingSingleOrder: false,
        singleOrderError: "Order not found",
      };
    }
  }
    if(action.type === CHANGE_STATUS_START) {
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.orderId === action.payload.id
              ? { ...order, orderStatus: action.payload.newStatus }
              : order
          ),
          statusUpdates: {
            ...state.statusUpdates,
            [action.payload.id]: action.payload.newStatus,
          },
        };
  }
    if(action.type === CHANGE_STATUS_SUCCESS) {
        const {id, newStatus} = action.payload
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.orderId === id ? { ...order, orderStatus: newStatus } : order
          ),
          statusUpdates: Object.fromEntries(
            Object.entries(state.statusUpdates).filter(
              ([id]) => id !== action.payload.id
            )
          ),
        };
  }
    if(action.type === CHANGE_STATUS_ERROR) {
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.id === action.payload.id
              ? { ...order, status: action.payload.oldStatus }
              : order
          ),
          error: action.payload.error,
        };
  }
  if (action.type === SEARCH_ORDERS) {    
    return { ...state,  searchTerm: action.payload}
  }
    if (action.type === CLEAR_SEARCH_ORDERS) {
      return {...state,  searchTerm: ""}
  }
  if (action.type === CLEAR_ORDERS_ERROR) {
    return {...state, error: null}
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default orders_reducer;
