import { SET_ORDERS, ADD_ORDER, SET_ERROR_ORDER, SET_LOADING_ORDER, UPDATE_ORDER, SET_SELECTED_ORDER } from "../actions"

const filter_reducer = (state, action) => {
    if (action.type === SET_ORDERS)  {
      return {
        ...state,
        orders: action.payload.orders,
        ordersSummary: action.payload.summary,
        isLoading: false
      }
    }
    if (action.type === ADD_ORDER){
        return {
            ...state,
            orders: [action.payload, ...state.orders]
        }
    }
    if(action.type === UPDATE_ORDER) {
         return {
           ...state,
           orders: state.orders.map((order) =>
             order.orderId === action.payload.orderId
               ? { ...order, ...action.payload }
               : order
           ),
         };
    }
    if(action.type === SET_SELECTED_ORDER) {
       return {
         ...state,
         selectedOrder: action.payload,
       }; 
    }
    if (action.type === SET_LOADING_ORDER) {
        return {
          ...state,
          isLoading: action.payload,
        };
    }
    if (action.type === SET_ERROR_ORDER) {
         return {
           ...state,
           error: action.payload,
           isLoading: false,
         };
    }

    throw new Error(`No Matching "${action.type}" - action type`);
}

export default filter_reducer