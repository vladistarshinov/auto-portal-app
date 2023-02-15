import instance from "@/shared/api/interceptors"
import { getReviewsUrl } from "@/shared/configs/api.config"
import { SetReviewDto } from "./useReviews"


export const ReviewService = {
	async getByProductId(id: string) {
		return await instance.get<any>(getReviewsUrl(`by-product/${id}`))
	},

	async setReview(dto: SetReviewDto) {
		return await instance.post<any>(getReviewsUrl(''))
	}

}