import OrdersContext from "./OrderContext";
import orders_reducer from "../../reducers/orders-reducer";
import { useCallback, useEffect, useReducer } from "react";
import { useToast } from "../Modal/useModal&Toast.js";
import {OrdersAPI} from "../../lib/endpoints/index.js"
import {
  GET_ORDERS_SUCCESS,
  GET_SINGLE_ORDER_SUCCESS,
  GET_SINGLE_ORDER_FAIL,
  GET_SINGLE_ORDER_REQUEST,
  GET_ORDERS_START,
  GET_ORDERS_ERROR,
  RECENT_ORDERS,
  PENDING_ORDERS,
  COMPLETED_ORDERS,
  DELETE_ORDER_START,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  CHANGE_STATUS_START,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_ERROR,
  SEARCH_ORDERS,
  CLEAR_SEARCH_ORDERS,
  CLEAR_ORDERS_ERROR,
} from "../../actions";


const initialState = {
  orders: [],
  recentOrders: [],
  pendingOrders: [],
  completedOrders: [],
  singleOrder: [],
  searchTerm: "",
  isLoadingSingleOrder: false,
  singleOrderError: null,
  error: null,
  statusUpdates: {},
  loading: false,
};

const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orders_reducer, initialState);
      const { showToast, TOAST_TYPES } = useToast();
  

  const fetchOrders = async()  => {
    dispatch({ type: GET_ORDERS_START });
    
    try {
      const res = await OrdersAPI.getAll()
      dispatch({type: GET_ORDERS_SUCCESS, payload: res.data})
    } catch (error) {
      dispatch({
        type: GET_ORDERS_ERROR,
        payload: error.response?.data?.message || error.message,
      });
    }

    
  };
  useEffect(() => {
  fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    
    let originalOrder = state.orders.find((o) => o.orderId === id);
    dispatch({ type: DELETE_ORDER_START, payload: id });
    

    try {
      await OrdersAPI.delete(id);
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: id })
      showToast("Order deleted successfully", TOAST_TYPES.SUCCESS);
      
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_ERROR,
        payload: {
          id,
          error: error.response?.data?.message || "Failed to delete order",
          originalOrder: originalOrder
        },
      });
      showToast(`Failed to delete Order`, TOAST_TYPES.ERROR);

    }
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
      dispatch({ type: GET_SINGLE_ORDER_REQUEST, payload: id });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, state.orders]
  );

  const changeStatus = async(id, newStatus) => {
    let oldStatus = state.orders.find((o) => o.orderId === id).orderStatus;
    dispatch({ type: CHANGE_STATUS_START, payload: { id, newStatus } });
    

    try {
      const res = await OrdersAPI.changeStatus(id, newStatus)
      dispatch({ type: CHANGE_STATUS_SUCCESS, payload: res.data.order })
      showToast("Order status successfully changed", TOAST_TYPES.SUCCESS);
      
    } catch (error) {
      dispatch({
        type: CHANGE_STATUS_ERROR,
        payload: {
          id,
          error: error.response?.data?.message || "Status update failed",
          oldStatus: oldStatus
        },
      });
      showToast(`Failed to change Order status`, TOAST_TYPES.ERROR);

    }
  };

  const orderSearch = useCallback((value) => {
    dispatch({ type: SEARCH_ORDERS, payload: value });
  }, []);

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

  const clearError = () => {
    dispatch({type: CLEAR_ORDERS_ERROR})
  }
    useEffect(() => {
      pendingOrders();
      recentOrders();
      completedOrders();
    }, [state.orders, pendingOrders, recentOrders, completedOrders]);
  
    const filterOrders = (orders, searchTerm) => {
      if (!searchTerm) return orders;
      
      const term = searchTerm.toLowerCase();
      return orders.filter(order => {
        return (
          order.orderId.toString().toLowerCase().includes(term) ||
          order.customerDetails.name.toLowerCase().includes(term) ||
          order.customerDetails.phone.toLowerCase().includes(term) ||
          order.orderStatus.toLowerCase().includes(term) ||
          order.orderedAt.toString().toLowerCase().includes(term) ||
          order.subtotal.toString().includes(term) ||
          order.orderItems.some(item => 
            item.productName.toLowerCase().includes(term)
          )
        )     
      });
    };

  return (
    <OrdersContext.Provider
      value={{ ...state, fetchSingleOrder, changeStatus, deleteOrder, orderSearch, clearSearch, getStatusColor, clearError, filterOrders }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
