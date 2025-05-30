import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, LOAD_CART, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from "../actions"

const cart_reducer = (state, action) => {
    if (action.type === ADD_TO_CART) {
        const { id, size, amount, product } = action.payload
        const tempItem = state.cart.find((i) => i.id === id + size)
        if (tempItem) {
            const tempCart = state.cart.map((cartItem) => {
                if (cartItem.id === id + size) { 
                    let newAmount = cartItem.amount + amount
                    if (newAmount > cartItem.max) {
                        newAmount = cartItem.max
                    }
                    return{...cartItem, amount: newAmount}
                } else {
                    return cartItem
                }
            })
            return {...state, cart: tempCart}
        } else {
            const newItem = {
                old: id,
                id: id + size,
                name: product.name,
                size,
                amount,
                image: product.images[0],
                price: product.price,
                max: product.stock,
                stock: product.stock,
                brand: product.brand,
            }
            return {...state, cart: [...state.cart, newItem]}
        }
    }
    if (action.type === LOAD_CART) {
        return{...state, cart: action.payload}
    }
    if (action.type === REMOVE_CART_ITEM) {
        const tempCart = state.cart.filter((item) => item.id !== action.payload)
        return {...state, cart: tempCart}
    }
    if (action.type === CLEAR_CART) {
        return {...state, cart: []}
    }
    if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
        const { id, value } = action.payload
        const tempCart = state.cart.map((item) => {
            if (item.id === id) { 
                if (value === "inc") {
                    let newAmount = item.amount + 1
                    if (newAmount > item.max) { 
                        newAmount = item.max
                    }
                    return {...item, amount: newAmount}
                }
                if (value === "dec") { 
                    let newAmount = item.amount - 1
                    if (newAmount < 1) { 
                        newAmount = 1
                    }
                    return {...item, amount: newAmount}
                }
            } else {
                return item
            }
        })
        return{...state, cart: tempCart}
    }
    if (action.type === COUNT_CART_TOTALS) {
        const { total_amount, total_items } = state.cart.reduce((total, cartItem) => {
            const { amount, price } = cartItem
            total.total_amount += amount * price
            total.total_items += amount
            return total
        }, {
            total_amount: 0, total_items: 0
        })
        return {...state, total_amount, total_items}
    }
    throw new Error(`No Matching "${action.type}" - action type`)

}

export default cart_reducer