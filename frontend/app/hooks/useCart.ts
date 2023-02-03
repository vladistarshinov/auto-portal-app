import { useTypedSelector } from '@/hooks/useTypedSelector'

export const useCart = () => {
	const cart = useTypedSelector(state => state.cart.items)

	const total = cart.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0
	).toFixed(2)

	const totalNum = cart.reduce(
		(acc, item) => acc + item.quantity,
		0
	)

	return { cart, total, totalNum }
}
