import { UserService } from '@/services/user/user.service';
import { GetStaticProps, NextPage } from 'next';
import { NextAuthPage } from '@/shared/types/auth.types';
import Shipping from '@/screens/shipping/Shipping';
import dynamic from 'next/dynamic';

const ShippingPage: NextAuthPage = () => {
	return <Shipping />;
};

ShippingPage.isOnlyUser = true;

export default dynamic(() => Promise.resolve(ShippingPage), { ssr: false });