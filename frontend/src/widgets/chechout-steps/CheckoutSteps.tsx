import CheckoutStepper from "@/shared/ui/checkout-stepper/CheckoutStepper";
import { Box } from "@mui/material";
import { FC } from "react";

const CheckoutSteps: FC<{currentStep: number}> = ({ currentStep }) => {
	return (
		<Box sx={{ my: 3 }}>
			<CheckoutStepper currentStep={currentStep} />
		</Box>
	);
};

export default CheckoutSteps;