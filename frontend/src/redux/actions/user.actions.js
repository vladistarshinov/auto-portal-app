import axios from "axios";
import { USER_LOGIN_SUCCESS } from "../constants/auth.constants";
import { USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL } from "../constants/user.constants";
import { logout } from "./auth.actions"

const getUserProfile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/users/profile`, config);

        dispatch({ type: USER_PROFILE_SUCCESS, payload: data }); 
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        if (message === "Не авторизован, токен просрочен" 
            || message === "Не авторизован, нет токена") {
            dispatch(logout());
        }
        dispatch({ 
            type: USER_PROFILE_FAIL, 
            payload: message
        }); 
    }
};

const updateUserProfile = (userDetails) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put('/api/users/profile', userDetails, config);

        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data }); 
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data }); 
        localStorage.setItem('userInfo', JSON.stringify(data));
        //localStorage.setItem('updatedUserInfo', JSON.stringify(userDetails));
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        if (message === "Не авторизован, токен просрочен" 
            || message === "Не авторизован, нет токена") {
            dispatch(logout());
        }
        dispatch({ 
            type: USER_UPDATE_PROFILE_FAIL, 
            payload: message
        }); 
    }
};

export { getUserProfile, updateUserProfile };