import { FC } from 'react'

import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import ProductList from '@/widgets/product-list/ProductList'
import TopProducts from '@/widgets/top-products/TopProducts'
import CategoryBlockList from '@/widgets/home/category-block-list/CategoryBlockList'

const HomeScreen: FC<{homeCategoryBlocks: any[], products: IProductsResponse, topProducts: IProduct[]}> = ({homeCategoryBlocks, products, topProducts}) => {
	return (
		<>
			<CategoryBlockList homeCategoryBlocks={homeCategoryBlocks} />
			<TopProducts products={topProducts} />
			<ProductList products={products}/>
		</>
	)
}

export default HomeScreen
