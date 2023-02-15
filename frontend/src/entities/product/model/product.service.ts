import instance from "@/shared/api/interceptors"
import {
	IProduct as ITopProductResponse,
	IProductDetailResponse,
	IProductsResponse
} from "@/shared/api/types/product.types"
import { getProductsUrl } from "@/shared/configs/api.config"

export const ProductService = {
	async getProducts() {
		const res = await instance.get<IProductsResponse>(getProductsUrl(''))
		return res
	},

	async getTopProducts() {
		const res = await instance.get<ITopProductResponse[]>(getProductsUrl('top'))
		return res
	},

	async getProduct(slug: string) {
		const res = await instance.get<IProductDetailResponse>(getProductsUrl(`by-slug/${slug}`))
		return res
	},

	async getProductById(id: string) {
		const res = await instance.get<IProductDetailResponse>(getProductsUrl(`${id}`))
		return res
	},
}