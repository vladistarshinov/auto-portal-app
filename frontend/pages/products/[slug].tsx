import ProductDetail from "@/screens/product/ProductDetail";
import { ProductService } from "@/services/product/product.service";
import { NextAuthPage } from "@/shared/types/auth.types";
import { GetStaticPaths, GetStaticProps } from "next";


const ProductPage: NextAuthPage<{ product: any | undefined }> = ({product}) => {
	return <ProductDetail product={product} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: products } = await ProductService.getProducts();
		const paths = products.res.map((product: any) => ({
			params: { slug: product.slug },
		}));
		return { paths, fallback: 'blocking' };
	} catch {
		return {
			paths: [],
			fallback: false,
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: product } = await ProductService.getProduct(String(params?.slug));
		return {
			props: { product },
		};
	} catch (e) {

		return {
			notFound: true,
		};
	}
};

export default ProductPage;
