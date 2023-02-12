import dynamic from 'next/dynamic'

import { NextAuthPage } from "@/shared/types/auth.types"
import PlaceOrderScreen from "@/screens/place-order/PlaceOrder"

const PlaceOrderPage: NextAuthPage = () => {
	return <PlaceOrderScreen />
}

PlaceOrderPage.isOnlyUser = true

export default dynamic(() => Promise.resolve(PlaceOrderPage), { ssr: false })