import { FC } from 'react'
import { Box } from '@mui/material'

import CheckoutSteps from '@/widgets/chechout-steps/CheckoutSteps'
import PlaceOrderInfo from '@/entities/place-order/ui/PlaceOrderInfo'

const PlaceOrderScreen: FC = () => {
	return (
		<>
			<CheckoutSteps currentStep={2} />
			<Box sx={{ display: { md: "flex" } }} justifyContent="center">
				<PlaceOrderInfo />
			</Box>
		</>
	)
}

export default PlaceOrderScreen