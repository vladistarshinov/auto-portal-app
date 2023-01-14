import Heading from "@/shared/ui/heading/Heading"
import Rating from "@/shared/ui/rating/Rating"
import { genEndOfNoun } from "@/utils/gen-end-of-noun"
import {
	Box,
	Button,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow
} from "@mui/material"
import { FC } from "react"

const ProductDetail: FC<{product: any}> = ({product}) => {
	return (
		<Box sx={{ mx: 5 }}>
			<Heading title={product.name} />
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
							{product.countOfReviews === 0 ? (
								<Box>Нет отзывов</Box>
							) : (
								<Box>
									{product.countOfReviews}{" "}
									{genEndOfNoun(
										product.countOfReviews,
										"отзыв",
										"отзыва",
										"отзывов"
									)}
								</Box>
							)}
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
											{product.countInStock}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
						<Box sx={{ py: 2 }} display="flex" justifyContent="center">
							{product.countInStock > 0 && (
								<Button
									variant="outlined"
									color="inherit"
								>
									Добавить в корзину
								</Button>
							)}
						</Box>
					</TableContainer>
				</Grid>
			</Grid>
		</Box>
	)
}

export default ProductDetail