import { ProductService } from "@/entities/product/model/product.service"
import { useMutation } from "@tanstack/react-query"
import { ReviewService } from "./review.service"


export interface SetReviewDto {
	productId: string
	rating: number
	description?: string
}

export const useReviewMutations = (dto: SetReviewDto) => {

	const { mutate, isLoading } = useMutation(
		['set review'],
		(dto: SetReviewDto) =>
			ReviewService.setReview(dto)
	)

	return {
		mutate,
		isLoading
	}
}
