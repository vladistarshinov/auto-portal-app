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
    USER_UPDATE_RESET} from "../constants/admin.constants";

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
    
export { userListReducer, userDetailsForAdminReducer, userUpdateReducer, userRemoveReducer };