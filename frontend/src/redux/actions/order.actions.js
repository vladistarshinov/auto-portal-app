import axios from "axios";
import { CRDER_CREATE_REQUEST, 
    CRDER_CREATE_SUCCESS, 
    CRDER_CREATE_FAIL, 
    CRDER_DETAILS_REQUEST,
    CRDER_DETAILS_SUCCESS,
    CRDER_DETAILS_FAIL,
    CRDER_UPDATE_STATUS_FOR_PAYING_REQUEST,
    CRDER_UPDATE_STATUS_FOR_PAYING_SUCCESS,
    CRDER_UPDATE_STATUS_FOR_PAYING_FAIL,
    MY_CRDERS_LIST_REQUEST,
    MY_CRDERS_LIST_SUCCESS,
    MY_CRDERS_LIST_FAIL } from "../constants/order.constants";

    const createOrder = (order) => async (dispatch, getState) => {
        try {
            dispatch({ type: CRDER_CREATE_REQUEST });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
    
            const { data } = await axios.post('/api/orders', order, config);
    
            dispatch({ type: CRDER_CREATE_SUCCESS, payload: data }); 
        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({ 
                type: CRDER_CREATE_FAIL, 
                payload: message
            }); 
        }
    };

    const getOrderDetails = (orderId) => async (dispatch, getState) => {
        try {
            dispatch({ type: CRDER_DETAILS_REQUEST });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
    
            const { data } = await axios.get(`/api/orders/${orderId}`, config);
    
            dispatch({ type: CRDER_DETAILS_SUCCESS, payload: data }); 
        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({ 
                type: CRDER_DETAILS_FAIL, 
                payload: message
            }); 
        }
    };

    const updateStatusPayingOrder = (orderId, paymentResult) => async (dispatch, getState) => {
        try {
            dispatch({ type: CRDER_UPDATE_STATUS_FOR_PAYING_REQUEST });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
    
            const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
    
            dispatch({ type: CRDER_UPDATE_STATUS_FOR_PAYING_SUCCESS, payload: data }); 
        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({ 
                type: CRDER_UPDATE_STATUS_FOR_PAYING_FAIL, 
                payload: message
            }); 
        }
    };

    const listOfMyOrders = () => async (dispatch, getState) => {
        try {
            dispatch({ type: MY_CRDERS_LIST_REQUEST });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
    
            const { data } = await axios.get('/api/orders/my-orders', config);
    
            dispatch({ type: MY_CRDERS_LIST_SUCCESS, payload: data }); 
        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({ 
                type: MY_CRDERS_LIST_FAIL, 
                payload: message
            }); 
        }
    };
    
    export { createOrder, 
            getOrderDetails, 
            updateStatusPayingOrder, 
            listOfMyOrders };