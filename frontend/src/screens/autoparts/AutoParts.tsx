import { FC } from 'react'

import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import ProductList from '@/widgets/product-list/ProductList'
import TopProducts from '@/widgets/top-products/TopProducts'

interface IAutoPartsScreen {
	products: IProductsResponse
	topProducts: IProduct[]
}

const AutoPartsScreen: FC<IAutoPartsScreen> = ({products, topProducts}) => {
	return (
		<>
			<TopProducts products={topProducts} />
			<ProductList products={products}/>
		</>
	)
}

export default AutoPartsScreen