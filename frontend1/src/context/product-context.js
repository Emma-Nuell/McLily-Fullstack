import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducers/product-reducer"
import { SIDEBAR_CLOSE, SIDEBAR_OPEN, ACTIVE_SUBLINK, GET_PRODUCTS_SUCCESS, GET_SINGLE_PRODUCT_SUCCESS } from "../actions";
import { products } from "../utils/constants"


const initialState = {
    isSidebarOpen: false,
    activeLink: null,
    products: [],
    featuredProducts: [],
    single_product: []
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
 
    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN })
    }
    const closeSidebar = () => {
        dispatch({type: SIDEBAR_CLOSE})
    }
    const changeLink = (name) => {
        dispatch({ type: ACTIVE_SUBLINK, payload: state.activeLink === name ? null : name })
    }
    const fetchProducts = () => {
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    }

    useEffect(() => {
fetchProducts()
    }, [])
    const fetchSingleProduct = (id) => {
        const singleProduct = products.find((product) => product.id === id)
        dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct})
    }
 
    

    return (
        <ProductsContext.Provider value={{...state, openSidebar, closeSidebar, changeLink, fetchSingleProduct }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductContext = () => {
return useContext(ProductsContext)
}