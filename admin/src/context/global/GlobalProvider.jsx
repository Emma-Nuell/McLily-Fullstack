import GlobalContext from "./GlobalContext";
import global_reducer from "../../reducers/global-reducer";
import { useCallback, useMemo, useReducer } from "react";
import { CLEAR_GLOBAL_SEARCH, GLOBAL_SEARCH, SET_SEARCH_LOADING, SHOW_RESULTS } from "../../actions";
import { useProductContext, useOrderContext } from "../index.js"


const initialState = {
    searchTerm: "",
    results: {
        products: [],
        orders: [],
    },
    loading: false,
  hasSearched: false,
    showResults: false,
}

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(global_reducer, initialState)
    const {products} = useProductContext()
    const {orders} = useOrderContext()

    
    const setLoading = useCallback((value) => {
      dispatch({ type: SET_SEARCH_LOADING, payload: value });
    }, []);

    const performGlobalSearch = useCallback(
      (value) => {
        dispatch({ type: GLOBAL_SEARCH, payload: { products, orders, value } });
      },
      [products, orders]
    ); 

    const clearSearch = useCallback(() => {
      dispatch({ type: CLEAR_GLOBAL_SEARCH });
    }, []);
  
  const setShowResults = useCallback((value) => {
      dispatch({ type: SHOW_RESULTS, payload: value });
    }, []);


    const contextValue = useMemo(
      () => ({
        ...state,
        setLoading,
        performGlobalSearch,
        clearSearch,
        setShowResults
      }),
      [state, setLoading, performGlobalSearch, clearSearch, setShowResults]
    );
    return (
        <GlobalContext.Provider value={contextValue}>
        {children}
    </GlobalContext.Provider>)
}

export default GlobalProvider