import { ADD_ITEM_TO_CART, CHANGE_PRODUCT_QUANTITY, HANDLE_DROPDOWN_CART, HANDLE_CURRENCY, HANDLE_CART_ITEMS_QUANTITY, HANDLE_DROPDOWN_CURRENCIES } from "../constants/action-types"

const initialState = {
    products: [],
    dropDownCart: false,
    currency: "USD",
    cartItemsQuantity: 0,
    dropDownCurrencies: false,
    currencySymbol: "$"
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            let exist = false
            state.products.map(product => {
                if(action.payload.id === product.id) {
                    let optionsCounter = 0
                    
                    product.options.map(option => {
                        action.payload.options.map(payloadOption => {
                            if(option.title === payloadOption.title) {
                                if(option.value === payloadOption.value) {
                                    optionsCounter++
                                }
                            }
                            return payloadOption
                        })
                        return option
                    })
                    if(optionsCounter === product.options.length) {
                        product.quantity++
                        exist = true
                    }
                    return product
                }
                return product
            })
            if(exist) {
                return Object.assign({}, state, {
                    products: state.products
                })
            } else {
                return Object.assign({}, state, {
                    products: state.products.concat(action.payload)
                })
            }
        case CHANGE_PRODUCT_QUANTITY:
            state.products.map(product => {
                if(action.payload.id === product.id) {
                    if(JSON.stringify(product.options) === JSON.stringify(action.payload.options)) {
                        if(action.payload.quantityDirection === "add") {
                            product.quantity++
                        } else if(product.quantity > 1) {
                            product.quantity--
                        } else if(product.quantity === 1) {
                            state.products = state.products.filter(productNow => (
                                productNow !== product
                            ))
                        }
                    }
                }
                return product
            })
            return Object.assign({}, state, {
                products: state.products
            })
        case HANDLE_DROPDOWN_CART:
            return Object.assign({}, state, {
                dropDownCart: !state.dropDownCart
            })
        case HANDLE_CURRENCY:
            return Object.assign({}, state, {
                currency: action.payload.currency,
                currencySymbol: action.payload.symbol
            })
        case HANDLE_CART_ITEMS_QUANTITY:
            if(action.payload === "add")
                state.cartItemsQuantity++
            else
                state.cartItemsQuantity--
            return Object.assign({}, state, {
                cartItemsQuantity: state.cartItemsQuantity
            })
        case HANDLE_DROPDOWN_CURRENCIES:
            if(state.dropDownCurrencies) {
                return Object.assign({}, state, {
                    dropDownCurrencies: false
                })
            } else {
                return Object.assign({}, state, {
                    dropDownCurrencies: true
                })
            }
        default:
            break
    }
    return state
}

export default rootReducer