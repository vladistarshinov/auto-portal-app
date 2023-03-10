import instance from "@/shared/api/interceptors"
import { getAutosUrl } from "@/shared/configs/api.config"
import { FiltersDto } from "./filters.dto"

export const AutoService = {
	async getAll(page?: number, limit?: number, searchTerm?: string, sort?: string, filters?: FiltersDto) {
		const res = await instance.get<any>(
			getAutosUrl(''), {
				params: {
					page,
					limit,
					search: searchTerm,
					sort
				}
			}
		)
		return res
	},

	async getDetail(slug: string) {
		const res = await instance.get<any>(getAutosUrl(`by-slug/${slug}`))
		return res
	},
}