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
	IHomeCategoryBlockResponse,
} from '@/shared/api/types/strapi-content.types';
import {
	IArticleContent,
	IPromotionContent,
} from '@/shared/api/types/strapi/news.types'
import {
	IHomeServiceBlockContent,
	IHomeServiceBlockResponse
} from '@/shared/api/types/strapi/home-service-block.types'
import { NewsService } from '@/entities/news/model/news.service'

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
		const queryService = qs.stringify(
			{
				populate: ['services', 'image', 'backgroundImages', 'coverImage']
			},
			{
				encodeValuesOnly: true,
			}
		);
		const topArticles = await NewsService.getTopArticles()
		const topPromotions = await NewsService.getTopPromotions()
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
