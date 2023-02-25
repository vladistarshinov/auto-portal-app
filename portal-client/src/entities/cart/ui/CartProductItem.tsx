import { FC } from 'react'
import { Box, CardContent, Grid, IconButton, Link, styled } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SelectInput from "@/shared/ui/select-input/SelectInput"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { useActions } from '@/app/store/utils/useActions'
import ChangeQuantityProductButton from '@/features/change-product-quantity/ChangeQuantityProduct'
import RemoveFromCartButton from '@/features/remove-from-cart/RemoveFromCartButton'

interface ICardProductItem {
	item: any
	quantity: number
	isPlaceorder?: boolean
}

const CardProductItem: FC<ICardProductItem> = ({item, quantity, isPlaceorder}) => {
	const { addToCart, removeFromCart, changeQuantity } = useActions()

	const LinkToProductDetails = styled(Link)({
		color: "navy",
		textDecoration: "none",
	})


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
						<LinkToProductDetails href={`/products/${item.slug}`}>
							{item.title}
						</LinkToProductDetails>
					</Grid>
					<Grid lg={2} md={2} sm={2} xs={4} item>
						${item.price}
					</Grid>
					<Grid lg={2} md={2} sm={2} xs={4} item display='inline-flex' alignItems='center'>
						{!isPlaceorder && (
							<ChangeQuantityProductButton item={item} type='minus' />
						)}
						<h3>{quantity} {isPlaceorder && 'шт.'}</h3>
						{!isPlaceorder && (
							<ChangeQuantityProductButton item={item} type='plus' />
						)}
					</Grid>
					<Grid lg={1} md={1} sm={2} xs={4} item>
						{!isPlaceorder && (
								<RemoveFromCartButton item={item} />
						)}
					</Grid>
				</Grid>
			</Grid>
		</CardContent>
	)
}

export default CardProductItem