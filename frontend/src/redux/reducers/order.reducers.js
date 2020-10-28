import { CRDER_CREATE_REQUEST, 
    CRDER_CREATE_SUCCESS, 
    CRDER_CREATE_FAIL } from "../constants/order.constants";

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

export { orderCreateReducer };