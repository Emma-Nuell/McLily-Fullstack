import React, { Children, useContext, useReducer, useState } from "react";
import reducer from "../reducers/user-reducer"

const initialState = {

}

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={{...state}}>
            {children}
        </UserContext.Provider>
    )
}
export const useUserContext = () => {
    return useContext(useContext)
}