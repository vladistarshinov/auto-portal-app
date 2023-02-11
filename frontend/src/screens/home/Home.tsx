import ProductList from '@/widgets/product-list/ProductList';
import TopProducts from '@/widgets/top-products/TopProducts';
import { FC } from 'react';

const Home: FC<{products: any, topProducts: any[]}> = ({products, topProducts}) => {
	return (
		<>
			<TopProducts products={topProducts} />
			<ProductList products={products}/>
		</>
	);
};

export default Home;
