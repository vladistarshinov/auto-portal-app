import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as authReducer } from '@/processes/auth/model/store/auth.slice';
import { reducer as cartReducer } from '../../store/cart/cart.slice';
import { reducer as orderReducer } from '../../store/order/order.slice';
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