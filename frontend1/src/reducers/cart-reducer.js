import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  SET_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  MERGE_CART,
  SET_ERROR_CART,
  SET_LOADING_CART,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === SET_LOADING_CART) {
    return { ...state, isLoading: action.payload };
  }
  if (action.type === SET_ERROR_CART) {
    return { ...state, isLoading: false, error: action.payload };
  }
  if (action.type === ADD_TO_CART) {
    const { product, size, quantity } = action.payload;
    const cartId = size
      ? `${product.productId}_${size.value}`
      : product.productId;
    const tempItem = state.cart.find((item) => item.cartId === cartId);

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.cartId === cartId) {
          const maxStock = size ? size.stock : product.stock;
          let newQuantity = cartItem.quantity + quantity;
          if (newQuantity > maxStock) {
            newQuantity = maxStock;
          }
          return { ...cartItem, quantity: newQuantity };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const itemPrice = size ? size.price : product.price;
      const itemStock = size ? size.stock : product.stock;
      const newItem = {
        cartId: cartId,
        productId: product.productId,
        name: product.name,
        size: size ? size.value : null,
        quantity: quantity,
        image: product.images[0],
        price: itemPrice,
        max: itemStock,
        stock: itemStock,
        brand: product.brand,
        product: product,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === SET_CART) {
    return { ...state, cart: action.payload, isLoading: false };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { cartId, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.cartId === cartId) {
        if (value === "inc") {
          let newQuantity = item.quantity + 1;
          if (newQuantity > item.max) {
            newQuantity = item.max;
          }
          return { ...item, quantity: newQuantity };
        }
        if (value === "dec") {
          let newQuantity = item.quantity - 1;
          if (newQuantity < 1) {
            newQuantity = 1;
          }
          return { ...item, quantity: newQuantity };
        }
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_amount, total_items } = state.cart.reduce(
      (total, cartItem) => {
        const { quantity, price } = cartItem;
        total.total_amount += quantity * price;
        total.total_items += quantity;
        return total;
      },
      {
        total_amount: 0,
        total_items: 0,
      }
    );
    return { ...state, total_amount, total_items };
  }
  if (action.type === MERGE_CART) {
    const mergedItems = [...action.payload.backendCart];

    action.payload.localCart.forEach((localItem) => {
      const existingIndex = mergedItems.findIndex(
        (backendItem) => backendItem.cartId === localItem.cartId
      );

      if (existingIndex > -1) {
        // items exist in both carts, take the higher quantity without exceeding max value
        const backendItem = mergedItems[existingIndex];
        const newQuantity = Math.min(
          backendItem.quantity + localItem.quantity,
          backendItem.max
        );
        mergedItems[existingIndex] = { ...backendItem, quantity: newQuantity };
      } else {
        mergedItems.push(localItem);
      }
    });
    return { ...state, cart: mergedItems };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
