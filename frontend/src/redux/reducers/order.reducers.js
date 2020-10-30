import { CRDER_CREATE_REQUEST, 
    CRDER_CREATE_SUCCESS, 
    CRDER_CREATE_FAIL, 
    CRDER_DETAILS_REQUEST,
    CRDER_DETAILS_SUCCESS,
    CRDER_DETAILS_FAIL, 
    CRDER_UPDATE_STATUS_FOR_PAYING_REQUEST,
    CRDER_UPDATE_STATUS_FOR_PAYING_SUCCESS,
    CRDER_UPDATE_STATUS_FOR_PAYING_FAIL,
    CRDER_UPDATE_STATUS_FOR_PAYING_RESET,
    MY_CRDERS_LIST_REQUEST,
    MY_CRDERS_LIST_SUCCESS,
    MY_CRDERS_LIST_FAIL,
    MY_CRDERS_LIST_RESET,
    ORDER_DETAILS_RESET } from "../constants/order.constants";

const orderCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case CRDER_CREATE_REQUEST:
            return {
                loading: true
            };
        case CRDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            };
        case CRDER_CREATE_FAIL:
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
        case CRDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CRDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };
        case CRDER_DETAILS_FAIL:
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
        case CRDER_UPDATE_STATUS_FOR_PAYING_REQUEST:
            return {
                loading: true
            };
        case CRDER_UPDATE_STATUS_FOR_PAYING_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case CRDER_UPDATE_STATUS_FOR_PAYING_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CRDER_UPDATE_STATUS_FOR_PAYING_RESET:
            return {};
        default: 
            return state;
    }
};

const myOrderListReducer = (state = { orders: [] }, action) => {
    switch(action.type) {
        case MY_CRDERS_LIST_REQUEST:
            return {
                loading: true
            };
        case MY_CRDERS_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            };
        case MY_CRDERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case MY_CRDERS_LIST_RESET:
            return { orders: [] };
        default: 
            return state;
    }
};

export { orderCreateReducer, 
        orderDetailsReducer, 
        orderPayReducer, 
        myOrderListReducer };