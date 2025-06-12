import React, { useContext, useEffect, useReducer,  } from "react";
import reducer from "../reducers/filter-reducer"
import { useProductContext } from "./product-context";
import { CLEAR_FILTERS, LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW, SORT_PRODUCTS, UPDATE_SORT } from "../actions";

const initialState = {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: "price-lowest",
    filters: {
        text: '',
        company: "all",
        category: "all",
        min_price: 0,
        max_price: 0,
        price: 0,
    }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
    const {products} = useProductContext()
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products })
    }, [products])

    useEffect(() => {
    dispatch({type: SORT_PRODUCTS})
    // dispatch({type: FILTER_PRODUCTS})
    }, [products, state.sort, state.filters])

    const setGridView = () => {
        dispatch({type: SET_GRIDVIEW})
    }
    const setListView = () => {
        dispatch({type: SET_LISTVIEW})
    }

    const updateSort = (e) => {
        const value = e.target.value
        dispatch({ type: UPDATE_SORT, payload: value})
    }

    const clearFilters = () => {
        dispatch({type: CLEAR_FILTERS})
    }
    
    return (
        <FilterContext.Provider value={{...state, setGridView, setListView, updateSort, clearFilters}}>
            {children}
        </FilterContext.Provider>
    )
} 

export const useFilterContext = () => {
    return useContext(FilterContext)
}