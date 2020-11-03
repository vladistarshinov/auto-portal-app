import axios from "axios";
import { ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL, 
    ORDER_UPDATE_STATUS_FOR_PAYING_REQUEST,
    ORDER_UPDATE_STATUS_FOR_PAYING_SUCCESS,
    ORDER_UPDATE_STATUS_FOR_PAYING_FAIL,
    MY_ORDERS_LIST_REQUEST,
    MY_ORDERS_LIST_SUCCESS,
    MY_ORDERS_LIST_FAIL,
    MY_ORDERS_LIST_RESET } from "../constants/order.constants";

    const createOrder = (order) => async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_CREATE_REQUEST });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
    
            const { data } = await axios.post('/api/orders', order, config);
    
            dispatch({ type: ORDER_CREATE_SUCCESS, payload: data }); 
        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({ 
                type: ORDER_CREATE_FAIL, 
                payload: message
            }); 
        }
    };

    const getOrderDetails = (orderId) => async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_DETAILS_REQUEST });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
    
            const { data } = await axios.get(`/api/orders/${orderId}`, config);
    
            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data }); 
        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({ 
                type: ORDER_DETAILS_FAIL, 
                payload: message
            }); 
        }
    };

    const updateStatusPayingOrder = (orderId, paymentResult) => async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_UPDATE_STATUS_FOR_PAYING_REQUEST });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
    
            const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
    
            dispatch({ type: ORDER_UPDATE_STATUS_FOR_PAYING_SUCCESS, payload: data }); 
        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({ 
                type: ORDER_UPDATE_STATUS_FOR_PAYING_FAIL, 
                payload: message
            }); 
        }
    };

    const listOfMyOrders = () => async (dispatch, getState) => {
        try {
            dispatch({ type: MY_ORDERS_LIST_REQUEST });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
    
            const { data } = await axios.get('/api/orders/my-orders', config);
    
            dispatch({ type: MY_ORDERS_LIST_SUCCESS, payload: data }); 
        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({ 
                type: MY_ORDERS_LIST_FAIL, 
                payload: message
            }); 
        }
    };
    
    export { createOrder, 
            getOrderDetails, 
            updateStatusPayingOrder, 
            listOfMyOrders };