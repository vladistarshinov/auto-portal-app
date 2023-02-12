import { useTypedSelector } from "@/app/store/utils/useTypedSelector"

export const useCheckout = () => {
	const shippingAddress = useTypedSelector(state => state.checkout.shippingAddress)
	const paymentMethod = useTypedSelector(state => state.checkout.paymentMethod)

	return { shippingAddress, paymentMethod }
}