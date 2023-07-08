import { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'

import { NextAuthPage } from '@/shared/types/auth.types'
import ShippingScreen from '@/screens/shipping/Shipping'

const ShippingPage: NextAuthPage = () => {
	return <ShippingScreen />
}

ShippingPage.isOnlyUser = true

export default dynamic(() => Promise.resolve(ShippingPage), { ssr: false })