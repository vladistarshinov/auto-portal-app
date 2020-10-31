import axios from "axios";
import { USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL, 
    USER_REMOVE_REQUEST,
    USER_REMOVE_FAIL,
    USER_REMOVE_SUCCESS} from "../constants/admin.constants";

const listOfUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/users`, config);

        dispatch({ type: USER_LIST_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_LIST_FAIL, 
            payload: message
        }); 
    }
};

const removeUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_REMOVE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.delete(`/api/users/${id}`, config);

        dispatch({ type: USER_REMOVE_SUCCESS }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_REMOVE_FAIL, 
            payload: message
        }); 
    }
};

export { listOfUsers, removeUser };