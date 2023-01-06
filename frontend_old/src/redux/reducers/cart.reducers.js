import { CART_ADD_PRODUCT, 
        CART_REMOVE_PRODUCT, 
        CART_SAVE_PAYMENT_METHOD, 
        CART_SAVE_SHIPPING_ADDRESS,
        CART_RESET_PRODUCTS } from "../constants/cart.constants";

const cartReducer = (state={ cartProductItems: [], shippingAddress: {} }, action) => {
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
        case CART_SAVE_SHIPPING_ADDRESS:
            return { 
                ...state,
                shippingAddress: action.payload
            };
        case CART_SAVE_PAYMENT_METHOD:
            return { 
                ...state,
                paymentMethod: action.payload
            };
        case CART_RESET_PRODUCTS:
            return {
                cartProductItems: [], 
                shippingAddress: {},
                paymentMethod: ''
            }
        default:
            return state;
    }
}

export { cartReducer };