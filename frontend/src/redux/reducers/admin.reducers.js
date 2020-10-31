import { USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL } from "../constants/admin.constants";

const userListReducer = (state = { userList: [] }, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, userList: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
    
export { userListReducer };