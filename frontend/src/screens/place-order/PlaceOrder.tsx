import { FC, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
	Box,
	Button,
	Card,
	CardMedia,
	Grid,
	List,
	ListItem,
	Paper
} from '@mui/material'

import CheckoutSteps from '@/widgets/chechout-steps/CheckoutSteps'
import CardProductItem from '@/entities/cart/ui/CartProductItem'
import { useCart } from '@/entities/cart/model/useCart'
import { useCheckout } from '@/processes/checkout/model/useCheckout'

const PlaceOrderScreen = () => {
	const router = useRouter()
	const {cart, total} = useCart()
	const {shippingAddress, paymentMethod} = useCheckout()

	const addDecimal = (num: number) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	const shippingPrice = addDecimal(Number(total) > 300 ? 0 : 100)
	const taxPrice = addDecimal(Number(0.13 * Number(total)))
	const totalPrice = addDecimal(
		Number(total) +
		Number(shippingPrice) +
		Number(taxPrice)
	)

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

	const LinkToProductDetails = {
		color: "navy",
		textDecoration: "none",
	}

	return (
		<>
			<CheckoutSteps currentStep={2} />
			<Box sx={{ display: { md: "flex" } }} justifyContent="center">
				<Grid container spacing={1}>
					<Grid xs={12} sm={12} md={7} lg={8} item sx={{ ml: 2 }}>
						<List>
							<ListItem
								style={{ flexDirection: "column", alignItems: "flex-start" }}
							>
								<h2>Доставка</h2>
								<p>
									<strong>Адрес: </strong>
									{shippingAddress?.address}, {shippingAddress?.city},{" "}
									{shippingAddress?.postalCode},{" "}
									{shippingAddress?.country}
								</p>
							</ListItem>

							<ListItem
								style={{ flexDirection: "column", alignItems: "flex-start" }}
							>
								<h2 style={{ padding: "1rem 0" }}>Оплата</h2>
								<p>
									<strong>Способ: </strong>
									{paymentMethod}
								</p>
							</ListItem>

							<ListItem
								style={{ flexDirection: "column", alignItems: "flex-start" }}
							>
								<h2>Заказ</h2>
								{cart.length === 0 ? (
									<Box>Ваша корзина пуста</Box>
								) : (
									<Card>
										{cart.map((item: any, index: number) => (
											<CardProductItem isPlaceorder item={item.product} quantity={item.quantity} key={item.product} />
										))}
									</Card>
								)}
							</ListItem>
						</List>
					</Grid>
					<Grid xs={12} sm={12} md={4} lg={3} ml={3} item>
						<Paper>
							<List>
								<ListItem>
									<h4>Суммарный заказ</h4>
								</ListItem>
								<ListItem>
									<Grid>
										<Box>Товары</Box>
										<Box>${total}</Box>
									</Grid>
								</ListItem>
								<ListItem>
									<Grid>
										<Box>Доставка</Box>
										<Box>${shippingPrice}</Box>
									</Grid>
								</ListItem>
								<ListItem>
									<Grid>
										<Box>Налог</Box>
										<Box>{taxPrice}</Box>
									</Grid>
								</ListItem>
								<ListItem>
									<Grid>
										<Box>
											<strong>Итого</strong>
										</Box>
										<Box>
											<strong>${totalPrice}</strong>
										</Box>
									</Grid>
								</ListItem>
								<ListItem>
									<Button
										variant="outlined"
										color="inherit"
										disabled={cart.length === 0}
										onClick={placeOrderHandler}
									>
										Отправить
									</Button>
								</ListItem>
							</List>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default PlaceOrderScreen