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

	async getProduct(slug: string) {
		const res = await instance.get<any>(getProductsUrl(`by-slug/${slug}`));
		return res;
	},

	async getProductById(id: string) {
		const res = await instance.get<any>(getProductsUrl(`${id}`));
		return res;
	},
};