import { GetStaticProps, NextPage } from 'next'

import HomeScreen from '@/screens/home/Home'
import { ProductService } from '@/entities/product/model/product.service'

const HomePage: NextPage<{ products: any, topProducts: any[] }> = ({ products, topProducts }) => {
	return <HomeScreen products={products} topProducts={topProducts} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: products } = await ProductService.getProducts()
		const { data: topProducts } = await ProductService.getTopProducts()
		return {
			props: {
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
