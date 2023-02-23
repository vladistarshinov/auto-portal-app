import { FC } from 'react'

import { IHomeCategoryBlockContent } from '@/shared/api/types/strapi-content.types'
import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import ProductList from '@/widgets/product-list/ProductList'
import TopProducts from '@/widgets/top-products/TopProducts'
import CategoryBlockList from '@/widgets/home/category-block-list/CategoryBlockList'
import TopNews from '@/widgets/top-news/TopNews'
import { IArticleContent, IPromotionContent } from '@/shared/api/types/strapi/news.types'

interface IHomeScreen {
	homeCategoryBlocks: IHomeCategoryBlockContent[]
	products: IProductsResponse
	topProducts: IProduct[]
	topArticles: IArticleContent[]
	topPromotions: IPromotionContent[]
}

const HomeScreen: FC<IHomeScreen> = ({homeCategoryBlocks, products, topProducts, topArticles, topPromotions}) => {
	return (
		<>
			<CategoryBlockList homeCategoryBlocks={homeCategoryBlocks} />
			<TopNews topArticles={topArticles} topPromotions={topPromotions} />
			<TopProducts products={topProducts} />
			<ProductList products={products}/>
		</>
	)
}

export default HomeScreen
