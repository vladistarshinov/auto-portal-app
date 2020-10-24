import { CART_ADD_PRODUCT, CART_REMOVE_PRODUCT } from "../constants/cart.constants";

const cartReducer = (state={ cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_PRODUCT:
            const item = action.payload;
            const existProduct = state.cartItems.find(x => x.product === item.product);
            if(existProduct) {
                return {
                    ...state,
                    cartItems: state.cartItems
                        .map(x => x.product === existProduct.product ? item : x)
                };
            } else {
                return { 
                    ...state,
                    cartItems: [...state.cartItems, item] 
                };
            }
        case CART_REMOVE_PRODUCT:
            return { 
                ...state,
                cartItems: state.cartItems
                    .filter(x => x.product !== action.payload) 
            };
        default:
            return state;
    }
}

export { cartReducer };