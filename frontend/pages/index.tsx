import { GetStaticProps, NextPage } from 'next'

import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import HomeScreen from '@/screens/home/Home'
import { ProductService } from '@/entities/product/model/product.service'
import { axiosStrapiClassic } from '@/shared/api/interceptors'
import { getHomeCategoryBlockUrl } from '@/shared/configs/strapi-api.config'
import { IHomeCategoryBlockContent } from '@/shared/api/types/strapi-content.types'

interface IHomePage {
	homeCategoryBlocks: any
	products: IProductsResponse
	topProducts: IProduct[]
}

const HomePage: NextPage<IHomePage> = ({ homeCategoryBlocks, products, topProducts }) => {
	return <HomeScreen homeCategoryBlocks={homeCategoryBlocks.data} products={products} topProducts={topProducts} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: homeCategoryBlocks } = await axiosStrapiClassic.get<IHomeCategoryBlockContent[]>(getHomeCategoryBlockUrl())
		const { data: products } = await ProductService.getProducts()
		const { data: topProducts } = await ProductService.getTopProducts()
		return {
			props: {
				homeCategoryBlocks,
				products,
				topProducts
			}
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default HomePage
