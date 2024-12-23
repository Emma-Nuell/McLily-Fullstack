import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducers/cart-reducer"
import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from "../actions";

const getLocalStorage = () => {
    let cart1 = localStorage.getItem("cart")
    return cart1 ? JSON.parse(cart1) : []
}

const initialState = {
    cart: getLocalStorage(),
    total_items: 0,
    total_amount: 0,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (id, size, amount, product) => {
        dispatch({ type: ADD_TO_CART, payload: { id, size, amount, product }})
    }

    const removeItem = (id) => {
     dispatch({type: REMOVE_CART_ITEM, payload: id})
    }
    const toggleAmount = (id, value) => {
        dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, value}})
    }
    const clearCart = () => {
        dispatch({type: CLEAR_CART})
    }
    useEffect(() => {
        dispatch({ type: COUNT_CART_TOTALS })
        localStorage.setItem("cart", JSON.stringify(state.cart))
    }, [state.cart])
    return (
        <CartContext.Provider value={{...state, addToCart, removeItem, toggleAmount, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}