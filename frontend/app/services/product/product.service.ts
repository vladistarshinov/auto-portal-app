import { getProductsUrl } from "@/configs/api.config";
import instance from "api/interceptors";

export const ProductService = {
	async getProducts() {
		const res = await instance.get<any>(getProductsUrl(''));
		return res;
	},

	async getTopProducts() {
		const res = await instance.get<any>(getProductsUrl('top'));
		return res;
	},


};