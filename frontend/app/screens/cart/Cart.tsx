import BreadCrumbs from "@/shared/ui/breadcrumbs/Breadcrumbs";
import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import SelectInput from "@/shared/ui/select-input/SelectInput";
import { productQuantity, productQuantityPrice } from "@/utils/product-quantity-calc";

const Cart: FC = () => {
	//const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
const cartProductItems: any[] = []

	const removeFromCartHandler = (id: string) => {
		//removeFromCard
	};

	const checkoutHandler = () => {
		//history.push("/login?redirect=shipping");
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
					{cartProductItems.length === 0 ? (
						<>
							<Typography>Корзина пустая</Typography>
						</>
					) : (
						<Card>
							{cartProductItems.map((item: any) => (
								<CardContent key={item.product}>
									<Grid>
										<Grid
											container
											spacing={2}
											alignItems="center"
											justifyContent="center"
										>
											<Grid lg={3} md={3} sm={5} xs={12} item>
												<Box
													component="img"
													sx={{ width: "100%" }}
													src={item.image}
													alt={item.name}
												/>
											</Grid>
											<Grid lg={3} md={3} sm={6} xs={12} item>
												<LinkToProductDetails href={`/product/${item.product}`}>
													{item.name}
												</LinkToProductDetails>
											</Grid>
											<Grid lg={2} md={2} sm={2} xs={4} item>
												${item.price}
											</Grid>
											<Grid lg={2} md={2} sm={2} xs={4} item>
												<SelectInput
													value={item.quantity}
													onChange={(e: any) =>
													{}
													}
													countInStock={item.countInStock}
												/>
											</Grid>
											<Grid lg={1} md={1} sm={2} xs={4} item>
												<IconButton
													color="inherit"
													onClick={() => removeFromCartHandler(item.product)}
												>
													<DeleteIcon color="error"></DeleteIcon>
												</IconButton>
											</Grid>
										</Grid>
									</Grid>
								</CardContent>
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
									Общее количество товара: {productQuantity(cartProductItems)}{" "}
									шт.
								</Typography>
								<Typography
									sx={{ display: "flex", justifyContent: "flex-end" }}
									variant="h5"
								>
									${productQuantityPrice(cartProductItems)}
								</Typography>
								<Button
									variant="outlined"
									disabled={cartProductItems.length === 0}
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
