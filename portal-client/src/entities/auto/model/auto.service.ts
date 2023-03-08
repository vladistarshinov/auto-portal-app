import instance from "@/shared/api/interceptors"
import { getAutosUrl } from "@/shared/configs/api.config"

export const AutoService = {
	async getAll() {
		const res = await instance.get<any>(getAutosUrl(''))
		return res
	},

	async getDetail(slug: string) {
		const res = await instance.get<any>(getAutosUrl(`by-slug/${slug}`))
		return res
	},
}