import { Box, CardContent, Grid, IconButton, Link, styled } from '@mui/material';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectInput from "@/shared/ui/select-input/SelectInput";
import { useActions } from '@/hooks/useActions';

const CardProductItem: FC<{item: any, quantity: number}> = ({item, quantity}) => {
	const { addToCart, removeFromCart, changeQuantity } = useActions()

	const addCartHandler = (item: any, value: number) => {

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
							sx={{ width: "100%" }}
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
					<Grid lg={2} md={2} sm={2} xs={4} item>
						<SelectInput
							value={quantity}
							onChange={(e: any) =>
								addCartHandler(item, e.target.value)
							}
							countInStock={item.countInStock}
						/>
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