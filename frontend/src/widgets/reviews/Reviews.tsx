import { useAuth } from "@/hooks/useAuth";
import Rating from "@/shared/ui/rating/Rating";
import { convertDate } from "@/shared/libs/date-time-filter";
import { Box, Button, FormControl, Grid, IconButton, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { FC, useState } from "react";

const Reviews: FC<{productId: string, product: any}> = ({ productId, product }) => {
	const user = useAuth()
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const submitReviewCreateHandler = (e: any) => {
		e.preventDefault();
		// create
		setRating(0);
		setComment("");
	};

	const submitReviewDeleteHandler = (productId: string, reviewId: string) => {
		console.log(productId, reviewId);
		// delete review
	};

	return (
		<Box sx={{ marginTop: "2rem" }}>
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
							<>
								<Box
									display="flex"
									flexDirection="column"
									sx={{ width: "100%" }}
								>
									<FormControl
										variant="standard"
										sx={{
											width: { md: "300px" },
											marginTop: "20px",
											marginBottom: "20px",
										}}
									>
										<InputLabel id="demo-simple-select-standard-label">
											Рейтинг
										</InputLabel>
										<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											value={rating}
											onChange={(e: any) => setRating(e.target.value)}
										>
											<MenuItem value="">Выберите оценку...</MenuItem>
											<MenuItem value="1">Очень плохо</MenuItem>
											<MenuItem value="2">Плохо</MenuItem>
											<MenuItem value="3">Удовлетворительно</MenuItem>
											<MenuItem value="4">Хорошо</MenuItem>
											<MenuItem value="5">Отлично</MenuItem>
										</Select>
									</FormControl>
									<FormControl>
										<InputLabel>Комментарий</InputLabel>
										<TextField
											id="outlined-multiline-flexible"
											label="Комментарий"
											multiline
											minRows={3}
											value={comment}
											onChange={(e) => setComment(e.target.value)}
										/>
									</FormControl>
								</Box>
								<Button
									onSubmit={submitReviewCreateHandler}
									variant="outlined"
									color="inherit"
									sx={{
										marginTop: "10px",
									}}
								>
									Отправить
								</Button>
							</>
						) : (
							<Box>
								Пожалуйста, <Link href="/login">авторизируйтесь</Link> для
								формирования отзыва{" "}
							</Box>
						)}
					</ListItem>
				</List>
			</Grid>
		</Box>
	);
};

export default Reviews;
