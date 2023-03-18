import instance from "@/shared/api/interceptors"
import { IAutoResponse } from "@/shared/api/types/auto.types"
import { getAutosUrl } from "@/shared/configs/api.config"
import { FiltersDto } from "./filters.dto"

export const AutoService = {
	async getAll(page?: number, limit?: number, searchTerm?: string, sort?: string, filters?: FiltersDto) {
		const { data } = await instance.post<IAutoResponse>(
			getAutosUrl(''),
			filters,
			{
				params: {
					page,
					limit,
					search: searchTerm,
					sort,
				}
			},
		)
		return data
	},

	async getDetail(slug: string) {
		const res = await instance.get<any>(getAutosUrl(`by-slug/${slug}`))
		return res
	},
}