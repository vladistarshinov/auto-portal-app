import * as authActions from '@/processes/auth/model/store/auth.actions'
import { cartSlice } from 'entities/cart/model/cart.slice'
import { checkoutSlice } from 'processes/checkout/model/checkout.slice'

export const allActions = {
	...authActions,
	...cartSlice.actions,
	...checkoutSlice.actions
}