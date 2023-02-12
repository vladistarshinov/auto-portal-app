import { useState } from "react"
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField
} from "@mui/material"

const ReviewForm = () => {
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const submitReviewCreateHandler = (e: any) => {
		e.preventDefault();
		// create
		setRating(0)
		setComment("")
	}

	const submitReviewDeleteHandler = (productId: string, reviewId: string) => {
		console.log(productId, reviewId)
		// delete review
	}

	return (
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
	)
}

export default ReviewForm