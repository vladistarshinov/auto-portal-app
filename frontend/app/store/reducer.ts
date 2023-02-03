import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as authReducer } from './auth/auth.slice';
import { reducer as cartReducer } from './cart/cart.slice';
import { combineReducers } from '@reduxjs/toolkit';

export const reducers = {
	user: authReducer,
	cart: cartReducer,
	toastr: toastrReducer,
};

export const rootReducer = combineReducers({
	...reducers
})