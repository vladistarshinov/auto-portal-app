import { FC } from "react"
import { Box } from "@mui/material"
import CheckoutStepper from "@/shared/ui/checkout-stepper/CheckoutStepper"

const CheckoutSteps: FC<{currentStep: number}> = ({ currentStep }) => {
	return (
		<Box sx={{ my: 3 }}>
			<CheckoutStepper currentStep={currentStep} />
		</Box>
	)
}

export default CheckoutSteps