import { Box, CardContent, Grid, IconButton, Link, styled } from '@mui/material';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectInput from "@/shared/ui/select-input/SelectInput";
import { useActions } from '@/hooks/useActions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CardProductItem: FC<{item: any, quantity: number}> = ({item, quantity}) => {
	const { addToCart, removeFromCart, changeQuantity } = useActions()

	const addCartHandler = (item: any, value: number) => {
		let cart: any[] = localStorage.get('cart')
		if (cart.find(p => p.product.id === item._id)) {
			cart = cart.filter(p => p.product.id !== item._id)
		}
		cart.push({product: item, quantity: value})
		localStorage.set('cart', cart)
	};

	const LinkToProductDetails = styled(Link)({
		color: "navy",
		textDecoration: "none",
	});


	return (
		<CardContent key={item._id}>
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
							sx={{ width: "40%" }}
							src={item.imageUrl}
							alt={item.title}
						/>
					</Grid>
					<Grid lg={3} md={3} sm={6} xs={12} item>
						<LinkToProductDetails href={`/product/${item._id}`}>
							{item.title}
						</LinkToProductDetails>
					</Grid>
					<Grid lg={2} md={2} sm={2} xs={4} item>
						${item.price}
					</Grid>
					<Grid lg={2} md={2} sm={2} xs={4} item display='inline-flex' alignItems='center'>
						<IconButton aria-label="minus" size="large" onClick={() => changeQuantity({ id: item._id, type: 'minus' })}>
							<RemoveIcon fontSize="inherit" />
						</IconButton>
						<h3>{quantity}</h3>
						<IconButton aria-label="plus" size="large" onClick={() => changeQuantity({ id: item._id, type: 'plus' })}>
							<AddIcon fontSize="inherit" />
						</IconButton>
					</Grid>
					<Grid lg={1} md={1} sm={2} xs={4} item>
						<IconButton
							color="inherit"
							onClick={() => removeFromCart({ id: item._id })}
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