import { ADD_ITEM_TO_CART, CHANGE_PRODUCT_QUANTITY, HANDLE_CART_ITEMS_QUANTITY, HANDLE_CURRENCY, HANDLE_DROPDOWN_CART, HANDLE_DROPDOWN_CURRENCIES } from "../constants/action-types"


export function addItemInCart(payload) {
    return { type: ADD_ITEM_TO_CART, payload }
}

export function changeProductQuantity(payload) {
    return { type: CHANGE_PRODUCT_QUANTITY, payload }
}

export function handleDropDownCart(payload) {
    return { type: HANDLE_DROPDOWN_CART, payload }
}

export function handleCurrency(payload) {
    return { type: HANDLE_CURRENCY, payload }
}

export function handleCartItemsQuantity(payload) {
    return { type: HANDLE_CART_ITEMS_QUANTITY, payload }
}

export function handleDropDownCurrencies(payload) {
    return { type: HANDLE_DROPDOWN_CURRENCIES, payload }
}