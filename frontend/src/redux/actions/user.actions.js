import axios from "axios";
import { USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL} from "../constants/user.constants";
import { logout } from "./auth.actions"

const getUserProfile = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

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

export { getUserProfile };