import instance from "@/shared/api/interceptors"
import { getAutoBrandsUrl } from "@/shared/configs/api.config"

export const AutoBrandService = {
	async getAll() {
		const res = await instance.get<string[]>(getAutoBrandsUrl())
		return res
	},
}