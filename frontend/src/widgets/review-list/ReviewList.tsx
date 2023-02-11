import Reviews from "@/entities/review/ui/Reviews"
import { useAuth } from "@/processes/auth/model/hooks/useAuth"
import { Box } from "@mui/material"
import { FC } from "react"

const ReviewList: FC<{product: any}> = ({product}) => {
	const {user} = useAuth()
	return (
		<>
			{user ? (
				<Reviews productId={product._id} product={product} />
			) : (
				<Box marginTop={2}>Авторизуйтесь для оставления комментария</Box>
			)}
		</>
	)
}

export default ReviewList