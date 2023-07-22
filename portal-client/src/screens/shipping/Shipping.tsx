import { FC } from "react"
import { Box, Typography } from "@mui/material"

import ShippingForm from "@/processes/checkout/ui/ShippingForm"
import CheckoutSteps from "@/widgets/chechout-steps/CheckoutSteps"

const ShippingScreen: FC = () => {

	return (
		<Box marginX={10}>
			<CheckoutSteps currentStep={0} />
			<Typography variant="h4" sx={{ paddingY: '1rem' }}>
				Доставка
			</Typography>
			<ShippingForm />
		</Box>
	)
}

export default ShippingScreen
