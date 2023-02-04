import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as authReducer } from './auth/auth.slice';
import { reducer as cartReducer } from './cart/cart.slice';
import { reducer as orderReducer } from './order/order.slice';
import { combineReducers } from '@reduxjs/toolkit';

export const reducers = {
	user: authReducer,
	cart: cartReducer,
	order: orderReducer,
	toastr: toastrReducer,
};

export const rootReducer = combineReducers({
	...reducers
})