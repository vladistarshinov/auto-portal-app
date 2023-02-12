import { ChangeEvent, FC, useState } from "react"
import axios from "axios"
import {
	Box,
	Grid,
	List,
	ListItem,
	ListItemText,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography
} from "@mui/material"

import Heading from "@/shared/ui/heading/Heading"
import Rating from "@/shared/ui/rating/Rating"
import SelectInput from "@/shared/ui/select-input/SelectInput"
import { useActions } from "@/shared/hooks/useActions"
import AddToCartButton from "@/features/add-to-cart/AddToCartButton"
import { useAuth } from "@/processes/auth/model/hooks/useAuth"

const ProductDetail: FC<{product: any}> = ({product}) => {
	const [quantity, setQuantity] = useState(1)

	return (
		<Grid container spacing={2}>
			<Grid lg={3} md={4} sm={8} xs={12} item>
				<Box
					component="img"
					sx={{ width: "100%" }}
					src={product.imageUrl}
					alt={product.title}
				/>
			</Grid>
			<Grid lg={6} md={4} sm={7} xs={12} item>
				<List>
					<ListItemText>
						<h3>{product.title}</h3>
					</ListItemText>
					<ListItem sx={{ display: "inline-flex", alignItems: "center" }}>
						<Rating value={product.rating} />
						<Typography variant='h5' sx={{ml: '10px', mb: 1}}>
							{product.rating}
						</Typography>
					</ListItem>
					<ListItemText>{product.description}</ListItemText>
				</List>
			</Grid>
			<Grid lg={3} md={4} sm={5} xs={12} item>
				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							<TableRow sx={{ width: "200px" }}>
								<TableCell>Цена:</TableCell>
								<TableCell sx={{ fontWeight: "700" }}>
									${product.price}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Статус:</TableCell>
								<TableCell>
									{product.countInStock > 0 ? "В наличии" : "Отсутствует"}
								</TableCell>
							</TableRow>
							{product.countInStock > 0 && (
								<TableRow>
									<TableCell>Количество:</TableCell>
									<TableCell>
										<SelectInput
											value={quantity}
											onChange={(e) =>
												setQuantity(e.target.value)
											}
											countInStock={product.countInStock}
										/>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
					<Box sx={{ py: 2 }} display="flex" justifyContent="center">
						{product.countInStock > 0 && (
							<AddToCartButton item={product} quantity={quantity} />
						)}
					</Box>
				</TableContainer>
			</Grid>
		</Grid>
	)
}

export default ProductDetail