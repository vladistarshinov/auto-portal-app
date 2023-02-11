import * as authActions from '@/processes/auth/model/store/auth.actions'
import { cartSlice } from '../../store/cart/cart.slice'
import { orderSlice } from '../../store/order/order.slice'

export const allActions = {
	...authActions,
	...cartSlice.actions,
	...orderSlice.actions
}