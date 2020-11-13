import axios from "axios";
import { PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL } from "../constants/product.constants";

const listOfProduct = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios
            .get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

const listOfTopProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST });
        const { data } = await axios
            .get('/api/products/top');
        dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ 
            type: PRODUCT_TOP_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
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
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

export { listOfProduct, detailsOfProduct, listOfTopProduct };