import { FC } from 'react'

import { IHomeCategoryBlockContent } from '@/shared/api/types/strapi-content.types'
import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import ProductList from '@/widgets/product-list/ProductList'
import TopProducts from '@/widgets/top-products/TopProducts'
import CategoryBlockList from '@/widgets/home/category-block-list/CategoryBlockList'

interface IHomeScreen {
	homeCategoryBlocks: IHomeCategoryBlockContent[]
	products: IProductsResponse
	topProducts: IProduct[]
}

const HomeScreen: FC<IHomeScreen> = ({homeCategoryBlocks, products, topProducts}) => {
	return (
		<>
			<CategoryBlockList homeCategoryBlocks={homeCategoryBlocks} />
			<TopProducts products={topProducts} />
			<ProductList products={products}/>
		</>
	)
}

export default HomeScreen
