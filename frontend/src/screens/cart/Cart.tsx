import BreadCrumbs from "@/shared/ui/breadcrumbs/Breadcrumbs";
import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import SelectInput from "@/shared/ui/select-input/SelectInput";
import { useRouter } from "next/router";
import CardProductItem from "@/widgets/cart/CartProductItem";
import { useAuth } from "@/shared/hooks/useAuth";
import { useCart } from "@/shared/hooks/useCart";

const Cart: FC = () => {
	const router = useRouter();
	const {user} = useAuth();
	const { cart, total, totalNum } = useCart()
	const checkoutHandler = () => {
		if (user) router.push("/shipping");
		else router.push("/login");
	};

	const LinkToProductDetails = styled(Link)({
		color: "navy",
		textDecoration: "none",
	});

	return (
		<Box marginX={4}>
			<BreadCrumbs
				navElements={[{ title: "Каталог" }, { title: "Корзина", url: "/cart" }]}
			/>
			<Typography variant="h4" style={{ padding: "1rem 0" }}>
				Корзина
			</Typography>
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
		</Box>
	);
};

export default Cart;
