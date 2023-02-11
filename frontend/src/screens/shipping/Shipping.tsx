import ShippingForm from "@/processes/checkout/ui/ShippingForm"
import CheckoutSteps from "@/widgets/chechout-steps/CheckoutSteps"
import { Box, Typography } from "@mui/material"
import { FC } from "react"

const Shipping: FC = () => {

	return (
		<Box marginX={10}>
			<CheckoutSteps currentStep={0} />
			<Typography variant="h4" style={{ padding: "1rem 0" }}>
				Доставка
			</Typography>
			<ShippingForm />
		</Box>
	)
}

export default Shipping
