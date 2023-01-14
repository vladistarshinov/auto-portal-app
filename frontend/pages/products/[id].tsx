import ProductDetail from "@/screens/product/ProductDetail"
import { ProductService } from "@/services/product/product.service";
import { NextAuthPage } from "@/shared/types/auth.types"
import { errorCatch } from "api/api.helper";
import { GetServerSideProps, GetStaticProps } from "next";

const ProductPage: NextAuthPage<{ product: any }> = ({product}) => {
	return <ProductDetail product={product} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const id = ctx.params!.id;
		const { data: product } = await ProductService.getProduct(String(id));
		return {
			props: { product },
		};
	} catch (e) {
		console.log(errorCatch(e));

		return {
			notFound: true,
		};
	}
};

export default ProductPage