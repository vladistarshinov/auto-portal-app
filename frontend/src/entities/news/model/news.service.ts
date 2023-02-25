import { axiosStrapiClassic } from "@/shared/api/interceptors"
import { IArticleResponse, IPromotionResponse } from "@/shared/api/types/strapi/news.types"
import { getArticlesUrl, getPromotionsUrl } from "@/shared/configs/strapi-api.config"
import { getFilterPopulateQuery, getPopulateQuery } from "../lib/query.params"

export const NewsService = {
	async getArticles() {
		const { data: { data: res } } = await axiosStrapiClassic.get<IArticleResponse>(getArticlesUrl() + `?${getPopulateQuery(['image', 'coverImage', 'tags'])}`)
		return res
	},

	async getPromotions() {
		const { data: { data: res } } = await axiosStrapiClassic.get<IPromotionResponse>(getPromotionsUrl() + `?${getPopulateQuery(['image', 'coverImage', 'tag'])}`)
		return res
	},

	async getTopArticles() {
		const { data: { data: res } } = await axiosStrapiClassic.get<IArticleResponse>(getArticlesUrl() + `?${getFilterPopulateQuery<boolean>( ['is_top', true], ['image', 'coverImage', 'tags'])}`)
		return res
	},

	async getTopPromotions() {
		const { data: { data: res } } = await axiosStrapiClassic.get<IPromotionResponse>(getPromotionsUrl() + `?${getFilterPopulateQuery<boolean>( ['is_top', true], ['image', 'coverImage', 'tag'])}`)
		return res
	}
}