
import { SIDEBAR_OPEN, SIDEBAR_CLOSE, ACTIVE_SUBLINK, GET_PRODUCTS_SUCCESS, GET_SINGLE_PRODUCT_SUCCESS } from "../actions";

const products_reducer = (state, action) => {
    if (action.type === SIDEBAR_OPEN) {
     return{...state, isSidebarOpen: true}
 }
    if (action.type === SIDEBAR_CLOSE) {
     return{...state, isSidebarOpen: false}
    }
    if (action.type === ACTIVE_SUBLINK) {
        return{...state, activeLink: action.payload}
    }
    if (action.type === GET_PRODUCTS_SUCCESS) {
        const featuredProducts = action.payload.filter((products) => products.featured === true)
        return {...state, products: action.payload, featuredProducts}
    }
    if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {...state, single_product: action.payload}
    }
    throw new Error(`No Matching "${action.type}" - action type`);
    
}

export default products_reducer