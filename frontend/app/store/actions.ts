import * as authActions from './auth/auth.actions'
import { cartSlice } from './cart/cart.slice'

export const allActions = {
	...authActions,
	...cartSlice.actions
}