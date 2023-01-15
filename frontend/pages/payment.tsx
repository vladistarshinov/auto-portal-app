import Payment from "@/screens/payment/Payment";
import { NextAuthPage } from "@/shared/types/auth.types";

const PaymentPage: NextAuthPage = () => {
	return <Payment />;
};

PaymentPage.isOnlyUser = true;

export default PaymentPage;