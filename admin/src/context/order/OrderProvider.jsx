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
} from "../../actions";

import { sampleOrderData } from "../../lib/constants";

const initialState = {
  orders: [],
  recentOrders: [],
  pendingOrders: [],
  completedOrders: [],
  singleOrder: [],
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

  useEffect(() => {
    pendingOrders();
    recentOrders();
    completedOrders();
  }, [state.orders, pendingOrders, recentOrders, completedOrders]);

  return (
    <OrdersContext.Provider
      value={{ ...state, fetchSingleOrder, changeStatus, deleteOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
