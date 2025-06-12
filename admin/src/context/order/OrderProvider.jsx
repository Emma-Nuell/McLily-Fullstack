import OrdersContext from "./OrderContext";
import orders_reducer from "../../reducers/orders-reducer";
import { useCallback, useEffect, useReducer } from "react";
import {
  GET_ORDERS_SUCCESS,
  GET_SINGLE_ORDER_SUCCESS,
  RECENT_ORDERS,
  PENDING_ORDERS,
  COMPLETED_ORDERS,
  DELETE_ORDER,
  CHANGE_STATUS,
  SEARCH_ORDERS,
  CLEAR_SEARCH_ORDERS,
} from "../../actions";

import { sampleOrderData } from "../../lib/constants";

const initialState = {
  orders: [],
  filteredOrders: [],
  recentOrders: [],
  pendingOrders: [],
  completedOrders: [],
  singleOrder: [],
  searchTerm: ""
};

const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orders_reducer, initialState);

  const fetchOrders = () => {
    dispatch({ type: GET_ORDERS_SUCCESS, payload: sampleOrderData });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = (id) => {
    const updatedOrders = state.orders.filter((order) => order.orderId !== id);
    dispatch({ type: DELETE_ORDER, payload: updatedOrders });
  };

  const pendingOrders = useCallback(() => {
    dispatch({ type: PENDING_ORDERS, payload: state.orders });
  }, [state.orders, dispatch]);

  const completedOrders = useCallback(() => {
    dispatch({ type: COMPLETED_ORDERS, payload: state.orders });
  }, [state.orders, dispatch]);

  const recentOrders = useCallback(() => {
    dispatch({ type: RECENT_ORDERS, payload: state.orders });
  }, [state.orders, dispatch]);

  const fetchSingleOrder = useCallback(
    (id) => {
      const singleOrder = state.orders.find((order) => order.orderId === id);
      dispatch({ type: GET_SINGLE_ORDER_SUCCESS, payload: singleOrder });
    },
    [dispatch, state.orders]
  );

  const changeStatus = (id, newStatus) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, newStatus } });
  };

  const orderSearch = (value) => {
    dispatch({type: SEARCH_ORDERS, payload: value})
  }

    const clearSearch = useCallback(() => {
      dispatch({ type: CLEAR_SEARCH_ORDERS });
    }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600";
      case "Processing":
        return "text-blue-600";
      case "Shipped":
        return "text-purple-600";
      case "Out_for_delivery":
        return "text-indigo-600";
      case "Delivered":
        return "text-green-600";
      case "Cancelled":
        return "text-red-600";
      case "Returned":
        return "text-orange-600";
      case "Refunded":
        return "text-pink-600";
      default:
        return "text-gray-600";
    }
  }

  useEffect(() => {
    pendingOrders();
    recentOrders();
    completedOrders();
  }, [state.orders, pendingOrders, recentOrders, completedOrders]);

  return (
    <OrdersContext.Provider
      value={{ ...state, fetchSingleOrder, changeStatus, deleteOrder, orderSearch, clearSearch, getStatusColor }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
