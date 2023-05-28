import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

import { NextAuthPage } from '@/shared/types/auth.types';
import CartScreen from '@/screens/cart/Cart';

const CartPage: NextAuthPage = () => {
	return <CartScreen />;
};

CartPage.isOnlyUser = true;

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });