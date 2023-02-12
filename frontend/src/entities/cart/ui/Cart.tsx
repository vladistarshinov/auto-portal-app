import { useRouter } from "next/router"
import { Button, Card, CardContent, Grid, Link, styled, Typography } from "@mui/material"

import { useAuth } from "@/processes/auth/model/hooks/useAuth"
import CardProductItem from "./CartProductItem"
import { useCart } from "../model/useCart"

const Cart = () => {
	const router = useRouter()
	const {user} = useAuth()
	const { cart, total, totalNum } = useCart()

	const checkoutHandler = () => {
		if (user) router.push("/shipping")
		else router.push("/login")
	}

	const LinkToProductDetails = styled(Link)({
		color: "navy",
		textDecoration: "none",
	})

	return (
		<>
			<Grid container spacing={3}>
				<Grid lg={8} md={8} sm={12} xs={12} item>
					{cart.length === 0 ? (
						<>
							<Typography>Корзина пустая</Typography>
						</>
					) : (
						<Card>
							{cart.map((item: any) => (
								<CardProductItem item={item.product} quantity={item.quantity} key={item.product} />
							))}
						</Card>
					)}
				</Grid>
				<Grid lg={4} md={4} sm={12} xs={12} item>
					<Grid>
						<Card>
							<CardContent>
								<Typography variant="h5">К оплате</Typography>
								<Typography>
									Общее количество товара: {totalNum}{" "}
									шт.
								</Typography>
								<Typography
									sx={{ display: "flex", justifyContent: "flex-end" }}
									variant="h5"
								>
									${total}
								</Typography>
								<Button
									variant="outlined"
									disabled={cart.length === 0}
									color="inherit"
									onClick={checkoutHandler}
								>
									Рассчитать
								</Button>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default Cart