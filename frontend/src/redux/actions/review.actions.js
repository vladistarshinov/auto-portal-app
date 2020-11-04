import axios from "axios";
import { REVIEW_CREATE_REQUEST, 
    REVIEW_CREATE_SUCCESS, 
    REVIEW_CREATE_FAIL,
    REVIEW_CREATE_RESET,
    REVIEW_REMOVE_REQUEST,
    REVIEW_REMOVE_SUCCESS,
    REVIEW_REMOVE_FAIL } from "../constants/review.constants";

const createReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: REVIEW_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.post(`/api/products/${productId}/reviews`, review, config);

        dispatch({ type: REVIEW_CREATE_SUCCESS }); 
    } catch(error) {
        dispatch({ 
            type: REVIEW_CREATE_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

const removeReview = (productId, reviewId) => async (dispatch, getState) => {
    try {
        dispatch({ type: REVIEW_REMOVE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/api/products/${productId}/reviews/${reviewId}`, config);

        dispatch({ type: REVIEW_REMOVE_SUCCESS }); 
    } catch(error) {
        dispatch({ 
            type: REVIEW_REMOVE_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

export { createReview, removeReview }