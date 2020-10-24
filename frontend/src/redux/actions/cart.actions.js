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
        const { cart:{ cartProductItems } } = getState();
        //getState().cart.cartProductItems
        // cookie.set("Корзина", JSON.stringify(cartProductItems));
        localStorage.setItem('Корзина', JSON.stringify(cartProductItems));

    } catch (error) {}
}

const removeProductFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_PRODUCT, payload: productId });
    const { cart:{ cartProductItems } } = getState();
    // cookie.set("Корзина", JSON.stringify(cartProductItems));
    localStorage.setItem('Корзина', JSON.stringify(cartProductItems));
}

export { addProductToCart, removeProductFromCart };