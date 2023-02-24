import { GetStaticProps, NextPage } from 'next'
import qs from 'qs'

import HomeScreen from '@/screens/home/Home'
import { axiosStrapiClassic } from '@/shared/api/interceptors'
import {
	getArticlesUrl,
	getHomeCategoryBlockUrl,
	getHomeServiceBlockUrl,
	getPromotionsUrl
} from '@/shared/configs/strapi-api.config'
import {
	IHomeCategoryBlockContent,
	IHomeCategoryBlockResponse
} from '@/shared/api/types/strapi-content.types'
import {
	IArticleContent,
	IArticleResponse,
	IPromotionContent,
	IPromotionResponse
} from '@/shared/api/types/strapi/news.types'
import {
	IHomeServiceBlockContent,
	IHomeServiceBlockResponse
} from '@/shared/api/types/strapi/home-service-block.types'

interface IHomePage {
	homeCategoryBlocks: IHomeCategoryBlockContent[]
	topArticles: IArticleContent[]
	topPromotions: IPromotionContent[]
	homeServiceBlock: IHomeServiceBlockContent
}

const HomePage: NextPage<IHomePage> = ({ homeServiceBlock, homeCategoryBlocks, topArticles, topPromotions }) => {
	return <HomeScreen
		homeCategoryBlocks={homeCategoryBlocks}
		topArticles={topArticles}
		topPromotions={topPromotions}
		homeServiceBlock={homeServiceBlock}
	/>
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const queryMedia = qs.stringify(
			{
				populate: ['media', 'coverImage']
			},
			{
				encodeValuesOnly: true,
			}
		);
		const { data: { data: homeCategoryBlocks } } = await axiosStrapiClassic.get<IHomeCategoryBlockResponse>(getHomeCategoryBlockUrl() + `?${queryMedia}`)
		const query = qs.stringify(
			{
				filters: {
					is_top: {
						$eq: true,
					},
				},
				populate: ['image', 'coverImage', 'tag', 'tags']
			},
			{
				encodeValuesOnly: true,
			}
		);
		const queryService = qs.stringify(
			{
				populate: ['services', 'image', 'backgroundImages', 'coverImage']
			},
			{
				encodeValuesOnly: true,
			}
		);
		const { data: { data: topArticles } } = await axiosStrapiClassic.get<IArticleResponse>(getArticlesUrl() + `?${query}`)
		const { data: { data: topPromotions } } = await axiosStrapiClassic.get<IPromotionResponse>(getPromotionsUrl() + `?${query}`)
		const { data: { data: homeServiceBlock } } = await axiosStrapiClassic.get<IHomeServiceBlockResponse>(getHomeServiceBlockUrl() + `?${queryService}`)
		return {
			props: {
				homeCategoryBlocks,
				topArticles,
				topPromotions,
				homeServiceBlock
			}
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default HomePage
