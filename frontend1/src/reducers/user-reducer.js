import {
  SET_ERROR_USER,
  SET_USER,
  CLEAR_USER,
  SET_LOADING_USER,
  SET_ERROR_WISHLIST,
  SET_LOADING_WISHLIST,
  SET_WISHLIST,
  ADD_ITEM_WISHLIST,
  REMOVE_ITEM_WISHLIST,
} from "../actions";

const user_reducer = (state, action) => {
  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload,
      isLoading: false,
      isAuthenticated: true,
    };
    }
    if (action.type === CLEAR_USER) {
        return {
            ...state,
            user: null,
            isLoading: false,
            isAuthenticated: false,
        }
    }
    if (action.type === SET_LOADING_USER) {
        return {
            ...state,
            isLoading: action.payload,
        }
    }
    if (action.type === SET_ERROR_USER) {
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        }
    }
    if (action.type === SET_WISHLIST) {
        return {
          ...state,
          wishlistItems: action.payload,
          isLoadingWishlist: false,
        };
    }
    if (action.type === ADD_ITEM_WISHLIST) {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, action.payload],
        };
    }
    if (action.type === REMOVE_ITEM_WISHLIST) {
       return {
         ...state,
         wishlistItems: state.wishlistItems.filter((item) => item.productId !== action.payload),
       };
    }
    if (action.type === SET_LOADING_WISHLIST) {
       return {
         ...state,
         isLoadingWishlist: action.payload,
       };
    }
    if (action.type === SET_ERROR_WISHLIST) {
      return {
        ...state,
        errorWishlist: action.payload,
        isLoadingWishlist: false,
      };
    }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default user_reducer;
