import axios from "axios";
// import cookie from "js-cookie";
import { CART_ADD_PRODUCT, CART_REMOVE_PRODUCT } from "../constants/cart.constants";

const addProductToCart = (productId, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: CART_ADD_PRODUCT, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity
        }} );
        const { cart:{ cartItems } } = getState();
        //getState().cart.cartItems
        // cookie.set("Корзина", JSON.stringify(cartItems));
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

    } catch (error) {}
}

const removeProductFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_PRODUCT, payload: productId });
    const { cart:{ cartItems } } = getState();
    // cookie.set("Корзина", JSON.stringify(cartItems));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export { addProductToCart, removeProductFromCart };