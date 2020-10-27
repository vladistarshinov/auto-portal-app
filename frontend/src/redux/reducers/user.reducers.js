import { USER_PROFILE_REQUEST,
        USER_PROFILE_SUCCESS,
        USER_PROFILE_FAIL,
        USER_UPDATE_PROFILE_REQUEST,
        USER_UPDATE_PROFILE_SUCCESS,
        USER_UPDATE_PROFILE_FAIL } from "../constants/user.constants";

const userProfileReducer = (state = { userDetails: {} }, action) => {
    switch(action.type) {
        case USER_PROFILE_REQUEST:
            return { ...state, loading: true };
        case USER_PROFILE_SUCCESS:
            return { loading: false, userDetails: action.payload };
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const userUpdateProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export { userProfileReducer, userUpdateProfileReducer };