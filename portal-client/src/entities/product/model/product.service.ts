import instance from "@/shared/api/interceptors"
import {
	IProduct as ITopProductResponse,
	IProductDetailResponse,
	IProductsResponse
} from "@/shared/api/types/product.types"
import { getProductsUrl } from "@/shared/configs/api.config"

export const ProductService = {
	async getAll(page?: number, limit?: number, searchTerm?: string, sort?: string, filters?: any) {
		const { data } = await instance.post<IProductsResponse>(
			getProductsUrl(''),
			filters,
			{
				params: {
					page,
					limit,
					search: searchTerm,
					sort,
				}
			}
		)
		return data
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