import React, { useContext, useReducer, useState } from "react";
import reducer from "../reducers/cart-reducer"

const initialState = {

}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <CartContext.Provider value={{...state}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}