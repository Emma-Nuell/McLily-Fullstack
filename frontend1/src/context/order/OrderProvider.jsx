import React, { useEffect, useReducer } from "react";
import reducer from "../../reducers/order-reducer";
import {
  SET_ORDERS,
  ADD_ORDER,
  UPDATE_ORDER,
  SET_SELECTED_ORDER,
  SET_LOADING_ORDER,
  SET_ERROR_ORDER
} from "../../actions";
import PropTypes from "prop-types";
import OrderContext from "./OrderContext.jsx";
import { useUserOrders } from "../../hooks/orderHooks.js";

const initialState = {
  orders: [],
  ordersSummary: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: ordersData, isLoading: ordersLoading } = useUserOrders();

  // Sync orders from API
  useEffect(() => {
    if (ordersData?.orders) {
      dispatch({ type: SET_ORDERS, payload: ordersData });
    }
  }, [ordersData]);

    const getOrder = (orderId) => {
      const cachedOrder = state.orders.find(
        (order) => order.orderId === orderId
      );

      if (cachedOrder) {
        return { data: cachedOrder, fromCache: true };
      }

      return { data: null, fromCache: false };
    };

      const selectOrder = (orderId) => {
        const order = getOrder(orderId);
        if (order.fromCache) {
          dispatch({ type: SET_SELECTED_ORDER, payload: order.data });
        }
        // If not in cache, the component should handle fetching
      };

        const updateOrder = (orderData) => {
          dispatch({ type: UPDATE_ORDER, payload: orderData });
        };

        const addOrder = (orderData) => {
          dispatch({ type: ADD_ORDER, payload: orderData });
        };

        const value = {
          orders: state.orders,
          ordersSummary: state.ordersSummary,
          selectedOrder: state.selectedOrder,
          isLoading: state.isLoading || ordersLoading,
          error: state.error,
          getOrder,
          selectOrder,
          updateOrder,
          addOrder,
        };

  return (
    <OrderContext.Provider
      value={value}
    >
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node,
};

export default OrderProvider