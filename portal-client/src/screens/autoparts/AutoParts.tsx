import { FC } from 'react'
import { Container } from '@mui/material'

import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import ProductList from '@/widgets/product-list/ProductList'
import TopProducts from '@/widgets/top-products/TopProducts'

interface IAutoPartsScreen {
	products: IProductsResponse
	topProducts: IProduct[]
}

const AutoPartsScreen: FC<IAutoPartsScreen> = ({products, topProducts}) => {
	return (
		<Container maxWidth="xl">
			<TopProducts products={topProducts} />
			<ProductList products={products}/>
		</Container>
	)
}

export default AutoPartsScreen