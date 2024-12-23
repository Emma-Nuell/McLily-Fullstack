import { CLEAR_FILTERS, LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW, SORT_PRODUCTS, UPDATE_SORT } from "../actions"

const filter_reducer = (state, action) => {
    if (action.type === LOAD_PRODUCTS) {
        let maxPrice = action.payload.map((p) => p.price);
        maxPrice = Math.max(...maxPrice)
        return{...state, all_products: [...action.payload], filtered_products: [...action.payload], filters: {...state, max_price: maxPrice, price: maxPrice}}
    }
    if (action.type === SET_GRIDVIEW) {
        return{...state, grid_view: true}
    }
    if (action.type === SET_LISTVIEW) {
        return{...state, grid_view: false}
    }
    if (action.type === UPDATE_SORT) {
        return {...state, sort: action.payload}
    }
    if (action.type === SORT_PRODUCTS) {
        const { sort, filtered_products } = state;
        let tempProducts = [...filtered_products];
        if (sort === 'price-lowest') { 
            tempProducts = tempProducts.sort((a, b) => a.price - b.price)
        }
        if (sort === 'price-highest') { 
            tempProducts = tempProducts.sort((a, b) => b.price - a.price)
        }
        if (sort === "name-a") {
            tempProducts = tempProducts.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
        }
        if (sort === "name-z") {
            tempProducts = tempProducts.sort((a, b) => {
                return b.name.localeCompare(a.name)
            })
        }
        return{...state, filtered_products: tempProducts}
    }
    if (action.type === CLEAR_FILTERS) {
        return {...state, filters: {...state.filters, text: "", company: "all", category: "all", price: state.filter.max_price}}
    }
    throw new Error(`No Matching "${action.type}" - action type`);
}

export default filter_reducer