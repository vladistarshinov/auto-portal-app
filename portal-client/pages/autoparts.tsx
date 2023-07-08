import { GetStaticProps, NextPage } from 'next'

import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import { ProductService } from '@/entities/product/model/product.service'
import AutoPartsScreen from '@/screens/autoparts/AutoParts'

interface IHomePage {
	products: IProductsResponse
	topProducts: IProduct[]
}

const AutoPartsPage: NextPage<IHomePage> = ({ products, topProducts }) => {
	return <AutoPartsScreen
		products={products}
		topProducts={topProducts}
	/>
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const products = await ProductService.getAll(1, 4)
		const { data: topProducts } = await ProductService.getTopProducts()
		return {
			props: {
				products,
				topProducts,
			}
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default AutoPartsPage