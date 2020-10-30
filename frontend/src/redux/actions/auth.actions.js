import axios from "axios";
import { USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGOUT, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL} from "../constants/auth.constants";
import { USER_PROFILE_RESET } from "../constants/user.constants";
import { MY_CRDERS_LIST_RESET } from "../constants/order.constants";

const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(
            '/api/users/register', 
            { name, email, password }, 
            config
        );

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data }); 
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data }); 

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ 
            type: USER_REGISTER_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(
            '/api/users/login', 
            { email, password }, 
            config
        );

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data }); 

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ 
            type: USER_LOGIN_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        }); 
    }
};

const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('updatedUserInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_PROFILE_RESET });
    dispatch({ type: MY_CRDERS_LIST_RESET })
};

export { register, login, logout };