import { useTypedSelector } from './useTypedSelector'

export const useOrder = () => {
	const shippingAddress = useTypedSelector(state => state.order.shippingAddress)
	const paymentMethod = useTypedSelector(state => state.order.paymentMethod)

	return { shippingAddress, paymentMethod }
}