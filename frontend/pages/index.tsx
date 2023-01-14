import Home from '@/screens/home/Home';
import { ProductService } from '@/services/product/product.service';
import { GetStaticProps, NextPage } from 'next';

const HomePage: NextPage<{ products: any }> = ({ products }) => {
	return <Home products={products} />;
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: products } = await ProductService.getProducts();

		return {
			props: {
				products,
			}
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default HomePage;
