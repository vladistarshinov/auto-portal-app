import PlaceOrder from "@/screens/place-order/PlaceOrder";
import { NextAuthPage } from "@/shared/types/auth.types";
import dynamic from 'next/dynamic';

const PlaceOrderPage: NextAuthPage = () => {
	return <PlaceOrder />;
};

PlaceOrderPage.isOnlyUser = true;

export default dynamic(() => Promise.resolve(PlaceOrderPage), { ssr: false });