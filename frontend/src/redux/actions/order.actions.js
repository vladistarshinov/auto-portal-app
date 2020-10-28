import axios from "axios";
import { CRDER_CREATE_REQUEST, 
    CRDER_CREATE_SUCCESS, 
    CRDER_CREATE_FAIL } from "../constants/order.constants";

    const createOrder = (order) => async (dispatch, getState) => {
        try {
            dispatch({ type: CRDER_CREATE_REQUEST });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
    
            const { data } = await axios.post('/api/orders', order, config);
    
            dispatch({ type: CRDER_CREATE_SUCCESS, payload: data }); 
        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({ 
                type: CRDER_CREATE_FAIL, 
                payload: message
            }); 
        }
    };
    
    export { createOrder };