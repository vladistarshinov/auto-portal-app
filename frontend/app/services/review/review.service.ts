import { getReviewsUrl } from "@/configs/api.config";
import instance from "api/interceptors";

export const ReviewService = {
	async getByProductId(id: string) {
		const res = await instance.get<any>(getReviewsUrl(`by-product/${id}`));
		return res;
	},

};