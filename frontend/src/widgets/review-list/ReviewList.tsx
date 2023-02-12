import { FC } from "react"
import { Box } from "@mui/material"

import Reviews from "@/entities/review/ui/Reviews"
import { useAuth } from "@/processes/auth/model/hooks/useAuth"

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