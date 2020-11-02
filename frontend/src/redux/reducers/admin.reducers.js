import { USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL, 
    USER_LIST_RESET,
    USER_REMOVE_REQUEST,
    USER_REMOVE_SUCCESS,
    USER_REMOVE_FAIL,
    USER_ADMIN_DETAILS_REQUEST,
    USER_ADMIN_DETAILS_SUCCESS,
    USER_ADMIN_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_REMOVE_REQUEST,
    PRODUCT_REMOVE_SUCCESS,
    PRODUCT_REMOVE_FAIL } from "../constants/admin.constants";

const userListReducer = (state = { userList: [] }, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, userList: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        case USER_LIST_RESET:
            return { userList: [] };
        default:
            return state;
    }
};

const userDetailsForAdminReducer = (state = { userAdminDetails: {} }, action) => {
    switch(action.type) {
        case USER_ADMIN_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_ADMIN_DETAILS_SUCCESS:
            return { loading: false, userAdminDetails: action.payload };
        case USER_ADMIN_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const userUpdateReducer = (state = { userAdminDetails: {} }, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userAdminDetails: action.payload };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

const userRemoveReducer = (state = { }, action) => {
    switch(action.type) {
        case USER_REMOVE_REQUEST:
            return { loading: true };
        case USER_REMOVE_SUCCESS:
            return { loading: false, success: true };
        case USER_REMOVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const productCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

const productUpdateReducer = (state = { product: {} }, action) => {
    switch(action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;
    }
};

const productRemoveReducer = (state = { }, action) => {
    switch(action.type) {
        case PRODUCT_REMOVE_REQUEST:
            return { loading: true };
        case PRODUCT_REMOVE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_REMOVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
    
export { userListReducer, 
        userDetailsForAdminReducer, 
        userUpdateReducer, 
        userRemoveReducer, 
        productCreateReducer,
        productUpdateReducer,
        productRemoveReducer };