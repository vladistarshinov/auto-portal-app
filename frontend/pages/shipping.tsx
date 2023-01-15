import Profile from '@/screens/profile/Profile';
import { UserService } from '@/services/user/user.service';
import { GetStaticProps, NextPage } from 'next';
import { NextAuthPage } from '@/shared/types/auth.types';
import Shipping from '@/screens/shipping/Shipping';

const ShippingPage: NextAuthPage = () => {
	return <Shipping />;
};

ShippingPage.isOnlyUser = true;

export default ShippingPage;