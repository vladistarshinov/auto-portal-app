import * as authActions from './auth/auth.actions'
import { cartSlice } from './cart/cart.slice'
import { orderSlice } from './order/order.slice'

export const allActions = {
	...authActions,
	...cartSlice.actions,
	...orderSlice.actions
}