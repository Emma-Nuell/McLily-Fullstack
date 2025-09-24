import React, {  useEffect, useReducer } from "react";
import reducer from "../../reducers/filter-reducer"
import {
  CLEAR_FILTERS,
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_SORT,
} from "../../actions";
import PropTypes from "prop-types";
import FilterContext from "./FilterContext";
import useProductsContext from "../product/useProductContext";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "top-sellers",
  filters: {
    text: "",
    company: "all",
    category: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
  },
};


export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (products.length > 0 ) {
      dispatch({ type: LOAD_PRODUCTS, payload: products });
    }
  }, [products]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
    // dispatch({type: FILTER_PRODUCTS})
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateSort, clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
    children: PropTypes.node,
}

export default FilterProvider


