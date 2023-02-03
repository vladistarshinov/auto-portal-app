import Profile from '@/screens/profile/Profile';
import { UserService } from '@/services/user/user.service';
import { GetStaticProps, NextPage } from 'next';
import { NextAuthPage } from '@/shared/types/auth.types';
import Cart from '@/screens/cart/Cart';
import dynamic from 'next/dynamic';

const CartPage: NextAuthPage = () => {
	return <Cart />;
};

CartPage.isOnlyUser = true;

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });