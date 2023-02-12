import { NextAuthPage } from "@/shared/types/auth.types"
import PaymentScreen from "@/screens/payment/Payment"

const PaymentPage: NextAuthPage = () => {
	return <PaymentScreen />
}

PaymentPage.isOnlyUser = true

export default PaymentPage