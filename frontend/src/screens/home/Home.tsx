import { FC } from 'react'

import { IHomeCategoryBlockContent } from '@/shared/api/types/strapi-content.types'
import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import CategoryBlockList from '@/widgets/home/category-block-list/CategoryBlockList'
import TopNews from '@/widgets/top-news/TopNews'
import { IArticleContent, IPromotionContent } from '@/shared/api/types/strapi/news.types'
import PickupCarForm from '@/features/pickup-car/ui/PickupCarForm'
import ServiceBlockList from '@/widgets/home/service-block-list/ServiceBlockList'
import { IHomeServiceBlockContent } from '@/shared/api/types/strapi/home-service-block.types'

interface IHomeScreen {
	homeCategoryBlocks: IHomeCategoryBlockContent[]
	topArticles: IArticleContent[]
	topPromotions: IPromotionContent[]
	homeServiceBlock: IHomeServiceBlockContent
}

const HomeScreen: FC<IHomeScreen> = ({
		homeServiceBlock,
		homeCategoryBlocks,
		topArticles,
		topPromotions
}) => {
	return (
		<>
			<CategoryBlockList content={homeCategoryBlocks} />
			<ServiceBlockList content={homeServiceBlock} />
			<TopNews topArticles={topArticles} topPromotions={topPromotions} />
			<PickupCarForm
				imageUrl={homeServiceBlock.attributes.backgroundImages?.data[0].attributes.url}
			/>
		</>
	)
}

export default HomeScreen
