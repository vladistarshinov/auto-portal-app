import ProductList from '@/components/product-list/ProductList';
import { FC } from 'react';

const Home: FC<{products: any}> = ({products}) => {
	return (
		<ProductList products={products}/>
	);
};

export default Home;
