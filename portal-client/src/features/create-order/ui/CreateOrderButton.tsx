import { FC } from "react"
import { Button } from "@mui/material"

import { useCart } from "@/entities/cart/model/useCart"

const CreateOrderButton: FC = () => {
	const {cart} = useCart()

	const placeOrderHandler = () => {
		/* createOrder({
			orderItems: cart.cartProductItems,
			shippingAddress: cart.shippingAddress,
			paymentMethod: cart.paymentMethod,
			productsPrice: cart.productsPrice,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice,
			totalPrice: cart.totalPrice,
		}) */
		//router.push(`/order/${order._id}`);
	}

	return (
		<Button
			variant="outlined"
			color="inherit"
			disabled={cart.length === 0}
			onClick={placeOrderHandler}
		>
			Отправить
		</Button>
	)
}

export default CreateOrderButton