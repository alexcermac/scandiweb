import { ADD_ITEM_TO_CART, CHANGE_PRODUCT_QUANTITY, HANDLE_DROPDOWN_CART, HANDLE_CURRENCY } from "../constants/action-types"

const initialState = {
    products: [],
    dropDownCart: false,
    currency: "USD"
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
            break
        case CHANGE_PRODUCT_QUANTITY:
            state.products.map(product => {
                if(action.payload.id === product.id) {
                    if(JSON.stringify(product.options) == JSON.stringify(action.payload.options)) {
                        if(action.payload.quantityDirection === "plus") {
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
            })
            return Object.assign({}, state, {
                products: state.products
            })
            break
        case HANDLE_DROPDOWN_CART:
            return Object.assign({}, state, {
                dropDownCart: !state.dropDownCart
            })
            break
        case HANDLE_CURRENCY:
            return Object.assign({}, state, {
                currency: action.payload
            })
        default:
            break
    }
    return state
}

export default rootReducer