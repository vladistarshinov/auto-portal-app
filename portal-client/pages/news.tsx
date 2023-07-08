import { GetStaticProps, NextPage } from "next"

import NewsScreen from "@/screens/news/News"
import { NewsService } from "@/entities/news/model/news.service"
import { axiosStrapiClassic } from "@/shared/api/interceptors"
import {
	IArticleContent,
	IPromotionContent,
} from "@/shared/api/types/strapi/news.types"

interface INewsPage {
	articles: IArticleContent[]
	promotions: IPromotionContent[]
}

const NewsPage: NextPage<INewsPage> = ({articles, promotions}) => {
	return <NewsScreen articles={articles} promotions={promotions} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {

		const articles = await NewsService.getArticles()
		const promotions = await NewsService.getPromotions()
		return {
			props: {
				articles,
				promotions,
			}
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default NewsPage