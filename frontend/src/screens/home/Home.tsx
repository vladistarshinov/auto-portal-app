import { FC } from 'react'

import ProductList from '@/widgets/product-list/ProductList'
import TopProducts from '@/widgets/top-products/TopProducts'

const HomeScreen: FC<{products: any, topProducts: any[]}> = ({products, topProducts}) => {
	return (
		<>
			<TopProducts products={topProducts} />
			<ProductList products={products}/>
		</>
	)
}

export default HomeScreen
