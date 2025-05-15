import React, { Children, useContext, useReducer, useState } from "react";
import reducer from "../reducers/user-reducer"
import { useCartContext } from "./cart-context";
import axios from "axios";

const initialState = {

}

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // const login = () => {
    //     const { mergeCartOnLogin } = useCartContext()
        
    //     const handleLogin = async (email, password) => {
    //         try {
    //             const { data } = axios.post("/api/user/login", { email, password })
    //             const token = data.token

    //             await mergeCartOnLogin(token)

    //             console.log("User logged in successfully");
                
    //         } catch (error) {
    //             console.error("Login error", error);
                
    //         }
    //     }
    // }

    return (
        <UserContext.Provider value={{...state}}>
            {children}
        </UserContext.Provider>
    )
}
export const useUserContext = () => {
    return useContext(useContext)
}