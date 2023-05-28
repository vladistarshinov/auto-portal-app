import { FC } from 'react'
import { Box, Card, Grid, List, ListItem, Paper } from "@mui/material"

import { addDecimal } from '@/shared/libs/add-decimal'
import { useCart } from '@/entities/cart/model/useCart'
import { useCheckout } from '@/processes/checkout/model/useCheckout'
import CardProductItem from '@/entities/cart/ui/CartProductItem'
import CreateOrderButton from '@/features/create-order/ui/CreateOrderButton'
import { useCalcPrice } from '../model/useCalcPrice'


const PlaceOrderInfo: FC = () => {
	const { cart, total } = useCart()
	const { shippingAddress, paymentMethod } = useCheckout()

	const { shippingPrice, taxPrice, totalPrice } = useCalcPrice(total)

	const LinkToProductDetails = {
		color: "navy",
		textDecoration: "none",
	}
	return (
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
							<CreateOrderButton />
						</ListItem>
					</List>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default PlaceOrderInfo