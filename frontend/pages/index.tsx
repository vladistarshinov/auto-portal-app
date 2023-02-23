import { GetStaticProps, NextPage } from 'next'
import qs from 'qs'

import HomeScreen from '@/screens/home/Home'
import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import { ProductService } from '@/entities/product/model/product.service'
import { axiosStrapiClassic } from '@/shared/api/interceptors'
import {
	getArticlesUrl,
	getHomeCategoryBlockUrl,
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

interface IHomePage {
	homeCategoryBlocks: IHomeCategoryBlockContent[]
	products: IProductsResponse
	topProducts: IProduct[]
	topArticles: IArticleContent[]
	topPromotions: IPromotionContent[]
}

const HomePage: NextPage<IHomePage> = ({ homeCategoryBlocks, products, topProducts, topArticles, topPromotions }) => {
	return <HomeScreen
		homeCategoryBlocks={homeCategoryBlocks}
		products={products}
		topProducts={topProducts}
		topArticles={topArticles}
		topPromotions={topPromotions}
	/>
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const queryC = qs.stringify(
			{
				populate: ['media', 'coverImage']
			},
			{
				encodeValuesOnly: true,
			}
		);
		const { data: { data: homeCategoryBlocks } } = await axiosStrapiClassic.get<IHomeCategoryBlockResponse>(getHomeCategoryBlockUrl() + `?${queryC}`)
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
		const { data: { data: topArticles } } = await axiosStrapiClassic.get<IArticleResponse>(getArticlesUrl() + `?${query}`)
		const { data: { data: topPromotions } } = await axiosStrapiClassic.get<IPromotionResponse>(getPromotionsUrl() + `?${query}`)
		const { data: products } = await ProductService.getProducts()
		const { data: topProducts } = await ProductService.getTopProducts()
		return {
			props: {
				homeCategoryBlocks,
				products,
				topProducts,
				topArticles,
				topPromotions
			}
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default HomePage
