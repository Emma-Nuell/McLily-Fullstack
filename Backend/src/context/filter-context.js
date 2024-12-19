import React, { useContext, useReducer, useState } from "react";
import reducer from "../reducers/filter-reducer"
import { useProductContext } from "./product-context";

const initialState = {

}

const FilterContext = React.createContext()

export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    return (
        <FilterContext.Provider value={{...state}}>
            {children}
        </FilterContext.Provider>
    )
} 

export const useFilterContext = () => {
    return useContext(FilterContext)
}