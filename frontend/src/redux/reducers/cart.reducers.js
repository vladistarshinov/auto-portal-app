import { CART_ADD_PRODUCT, CART_REMOVE_PRODUCT } from "../constants/cart.constants";

const cartReducer = (state={ cartProductItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_PRODUCT:
            const item = action.payload;
            const existProduct = state.cartProductItems.find(x => x.product === item.product);
            if(existProduct) {
                return {
                    ...state,
                    cartProductItems: state.cartProductItems
                        .map(x => x.product === existProduct.product ? item : x)
                };
            } else {
                return { 
                    ...state,
                    cartProductItems: [...state.cartProductItems, item] 
                };
            }
        case CART_REMOVE_PRODUCT:
            return { 
                ...state,
                cartProductItems: state.cartProductItems
                    .filter(x => x.product !== action.payload) 
            };
        default:
            return state;
    }
}

export { cartReducer };