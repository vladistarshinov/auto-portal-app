import instance from "@/shared/api/interceptors"
import { getReviewsUrl } from "@/shared/configs/api.config"


export const ReviewService = {
	async getByProductId(id: string) {
		return await instance.get<any>(getReviewsUrl(`by-product/${id}`))
	},

}