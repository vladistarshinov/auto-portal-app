import { Box, CardContent, Grid, IconButton, Link, styled } from '@mui/material';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectInput from "@/shared/ui/select-input/SelectInput";

const CardProductItem: FC<{item: any}> = ({item}) => {

	const addCartHandler = (item: any, value: number) => {
		//removeFromCard
		let cart: any[] = localStorage.get('cart')
		if (cart.find(p => p.product.id === item._id)) {
			cart = cart.filter(p => p.product.id !== item._id)
		}
		cart.push({product: item, quantity: value})
		localStorage.set('cart', cart)
	};

	const removeFromCartHandler = (id: string) => {
		//removeFromCard
	};

	const LinkToProductDetails = styled(Link)({
		color: "navy",
		textDecoration: "none",
	});


	return (
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
							addCartHandler(item, e.target.value)
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
	)
}

export default CardProductItem