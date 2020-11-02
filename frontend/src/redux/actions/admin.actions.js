import axios from "axios";
import { USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL, 
    USER_REMOVE_REQUEST,
    USER_REMOVE_FAIL,
    USER_REMOVE_SUCCESS,
    USER_ADMIN_DETAILS_REQUEST,
    USER_ADMIN_DETAILS_SUCCESS,
    USER_ADMIN_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_REMOVE_REQUEST,
    PRODUCT_REMOVE_SUCCESS,
    PRODUCT_REMOVE_FAIL } from "../constants/admin.constants";
import { USER_PROFILE_SUCCESS } from "../constants/user.constants";

const listOfUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/admin/users`, config);

        dispatch({ type: USER_LIST_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_LIST_FAIL, 
            payload: message
        }); 
    }
};

const getUserDetailsForAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ADMIN_DETAILS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/admin/users/${id}`, config);

        dispatch({ type: USER_ADMIN_DETAILS_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_ADMIN_DETAILS_FAIL, 
            payload: message
        }); 
    }
};

const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`/api/admin/users/${user._id}`, user, config);

        dispatch({ type: USER_UPDATE_SUCCESS }); 
        dispatch({ type: USER_ADMIN_DETAILS_SUCCESS, payload: data }); 
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_UPDATE_FAIL, 
            payload: message
        }); 
    }
};

const removeUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_REMOVE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/api/admin/users/${id}`, config);

        dispatch({ type: USER_REMOVE_SUCCESS }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_REMOVE_FAIL, 
            payload: message
        }); 
    }
};

const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(`/api/admin/products`, product, config);

        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: PRODUCT_CREATE_FAIL, 
            payload: message
        }); 
    }
};

const removeProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_REMOVE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/api/admin/products/${id}`, config);

        dispatch({ type: PRODUCT_REMOVE_SUCCESS }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: PRODUCT_REMOVE_FAIL, 
            payload: message
        }); 
    }
};

export { listOfUsers, 
        getUserDetailsForAdmin, 
        updateUser, 
        removeUser, 
        createProduct,
        removeProduct };