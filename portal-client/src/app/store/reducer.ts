import { reducer as toastrReducer } from 'react-redux-toastr'
import { combineReducers } from '@reduxjs/toolkit'

import { reducer as authReducer } from '@/processes/auth/model/store/auth.slice'
import { reducer as checkoutReducer } from '@/processes/checkout/model/checkout.slice'
import { reducer as cartReducer } from '@/entities/cart/model/cart.slice'

export const reducers = {
	user: authReducer,
	cart: cartReducer,
	checkout: checkoutReducer,
	toastr: toastrReducer,
};

export const rootReducer = combineReducers({
	...reducers
})