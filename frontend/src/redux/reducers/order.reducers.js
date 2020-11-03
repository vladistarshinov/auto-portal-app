import { ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL, 
    ORDER_UPDATE_STATUS_FOR_PAYING_REQUEST,
    ORDER_UPDATE_STATUS_FOR_PAYING_SUCCESS,
    ORDER_UPDATE_STATUS_FOR_PAYING_FAIL,
    ORDER_UPDATE_STATUS_FOR_PAYING_RESET,
    MY_ORDERS_LIST_REQUEST,
    MY_ORDERS_LIST_SUCCESS,
    MY_ORDERS_LIST_FAIL,
    MY_ORDERS_LIST_RESET,
    ORDER_DETAILS_RESET } from "../constants/order.constants";

const orderCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            };
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            };
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default: 
            return state;
    }
};

const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default: 
            return state;
    }
};

const orderPayReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_UPDATE_STATUS_FOR_PAYING_REQUEST:
            return {
                loading: true
            };
        case ORDER_UPDATE_STATUS_FOR_PAYING_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case ORDER_UPDATE_STATUS_FOR_PAYING_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case ORDER_UPDATE_STATUS_FOR_PAYING_RESET:
            return {};
        default: 
            return state;
    }
};

const myOrderListReducer = (state = { orders: [] }, action) => {
    switch(action.type) {
        case MY_ORDERS_LIST_REQUEST:
            return {
                loading: true
            };
        case MY_ORDERS_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            };
        case MY_ORDERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case MY_ORDERS_LIST_RESET:
            return { orders: [] };
        default: 
            return state;
    }
};

export { orderCreateReducer, 
        orderDetailsReducer, 
        orderPayReducer, 
        myOrderListReducer };