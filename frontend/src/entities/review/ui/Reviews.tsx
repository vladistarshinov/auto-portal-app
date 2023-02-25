import { FC, useState } from "react"
import Link from "next/link"
import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	List,
	ListItem,
	MenuItem,
	Select,
	TextField,
	Typography
} from "@mui/material"

import Rating from "@/shared/ui/rating/Rating"
import { convertDate } from "@/shared/libs/date-time-filter"
import { useAuth } from "@/processes/auth/model/hooks/useAuth"
import ReviewForm from "@/features/add-review/ReviewForm"

const Reviews: FC<{productId: string, product: any}> = ({ productId, product }) => {
	const user = useAuth()

	return (
		<Container maxWidth='xl' sx={{ marginTop: "2rem" }}>
			<Grid md={9}>
				<Typography variant="h5" sx={{ padding: "1rem 0" }}>
					Отзывы{" "}
					{product?.reviews?.length === 0
						? ""
						: "(" + product.countOfReviews + ")"}
				</Typography>
				{product.reviews?.length === 0 && <Box>Нет отзывов</Box>}
				<List>
					{product.reviews?.map((review: any) => (
						<ListItem
							alignItems="flex-start"
							key={review._id}
							sx={{ backgroundColor: "#fafafa", flexDirection: "column", my: 1 }}
						>
							<Grid display="inline-flex" alignItems="center">
								<strong>
									{review.user.firstName}
									{"     "}
								</strong>
							</Grid>
							<Rating value={review.rating} />
							<small>{convertDate(review.createdAt)}</small>
							<Typography sx={{ marginTop: "1rem" }}>
								{review.description}
							</Typography>
						</ListItem>
					))}
					<ListItem alignItems="flex-start" sx={{ flexDirection: "column" }}>
						<Typography variant="h6">Оставить отзыв</Typography>
						{user ? (
							<ReviewForm />
						) : (
							<Box>
								Пожалуйста, <Link href="/login">авторизируйтесь</Link> для
								формирования отзыва{" "}
							</Box>
						)}
					</ListItem>
				</List>
			</Grid>
		</Container>
	)
}

export default Reviews
