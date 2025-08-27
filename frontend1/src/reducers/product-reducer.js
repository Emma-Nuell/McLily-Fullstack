import { SIDEBAR_OPEN, SIDEBAR_CLOSE, ACTIVE_SUBLINK,ADD_PRODUCTS, CLEAR_PRODUCTS, UPDATE_PRODUCT } from "../actions";


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
    if (action.type === ADD_PRODUCTS) {
        const newProducts = action.payload.reduce((acc, product) => {
            if (product && product.productId) {
                acc[product.productId] = product
            }
            return acc
        }, {})

    return {...state, products: {...state.products, ...newProducts}}
    }
    if (action.type === UPDATE_PRODUCT) {
        if (!action.payload.productId) return state

        return {
            ...state,
            products: {
                ...state.products,
                [action.payload.productId]: {
                    ...state.products[action.payload.productId],
                    ...action.payload
                }
            }
        }
    }

    if (action.type === CLEAR_PRODUCTS) {
        return {
            ...state,
            products: {}
        }
    }
    throw new Error(`No Matching "${action.type}" - action type`);
    
}

export default products_reducer