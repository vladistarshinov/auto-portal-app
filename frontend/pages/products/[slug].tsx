import { GetStaticPaths, GetStaticProps } from "next"

import { NextAuthPage } from "@/shared/types/auth.types"
import ProductScreen from "@/screens/product/Product"
import { ProductService } from "@/entities/product/model/product.service"
import { IProduct, IProductDetailResponse } from "@/shared/api/types/product.types"
import NotFoundPage from "../404"


const ProductPage: NextAuthPage<{ product: IProductDetailResponse | undefined }> = ({product}) => {
	return (
		product ? <ProductScreen product={product} /> : <NotFoundPage />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: products } = await ProductService.getProducts()

		const paths = products.res.map((product: IProduct) => ({
			params: { slug: product.slug },
		}))

		return { paths, fallback: 'blocking' };
	} catch {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: product } = await ProductService.getProduct(String(params?.slug))
		return {
			props: { product },
		}
	} catch (e) {

		return {
			notFound: true,
		}
	}
}

export default ProductPage
