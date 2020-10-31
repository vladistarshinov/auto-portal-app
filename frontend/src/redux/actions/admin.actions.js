import axios from "axios";
import { USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL, 
    USER_REMOVE_REQUEST,
    USER_REMOVE_FAIL,
    USER_REMOVE_SUCCESS,
    USER_ADMIN_DETAILS_REQUEST,
    USER_ADMIN_DETAILS_SUCCESS,
    USER_ADMIN_DETAILS_FAIL} from "../constants/admin.constants";

const listOfUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/admin/users`, config);

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

const getUserDetailsForAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ADMIN_DETAILS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/admin/users/${id}`, config);

        dispatch({ type: USER_ADMIN_DETAILS_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({ 
            type: USER_ADMIN_DETAILS_FAIL, 
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

        await axios.delete(`/api/admin/users/${id}`, config);

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

export { listOfUsers, getUserDetailsForAdmin, removeUser };