import { USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL, 
    USER_LIST_RESET,
    USER_REMOVE_REQUEST,
    USER_REMOVE_SUCCESS,
    USER_REMOVE_FAIL} from "../constants/admin.constants";

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
    
export { userListReducer, userRemoveReducer };