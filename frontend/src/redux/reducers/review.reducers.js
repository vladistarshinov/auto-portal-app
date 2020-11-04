import { REVIEW_CREATE_REQUEST, 
    REVIEW_CREATE_SUCCESS, 
    REVIEW_CREATE_FAIL,
    REVIEW_CREATE_RESET, 
    REVIEW_REMOVE_REQUEST,
    REVIEW_REMOVE_SUCCESS,
    REVIEW_REMOVE_FAIL } from "../constants/review.constants";

const reviewCreateReducer = (state = { }, action) => {
    switch (action.type) {
        case REVIEW_CREATE_REQUEST:
            return { loading: true };
        case REVIEW_CREATE_SUCCESS:
            return { loading: false, success: true };
        case REVIEW_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case REVIEW_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

const reviewRemoveReducer = (state = { }, action) => {
    switch (action.type) {
        case REVIEW_REMOVE_REQUEST:
            return { loading: true };
        case REVIEW_REMOVE_SUCCESS:
            return { loading: false, success: true };
        case REVIEW_REMOVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export { reviewCreateReducer, reviewRemoveReducer };