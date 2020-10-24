import axios from "axios";
import { PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL } from "../constants/product.constants";

const listOfProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get("/api/products");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.msg 
                ? error.response.data.msg
                : error.message
        }); 
    }
};

const detailsOfProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.msg 
                ? error.response.data.msg
                : error.message
        }); 
    }
}

export { listOfProduct, detailsOfProduct }