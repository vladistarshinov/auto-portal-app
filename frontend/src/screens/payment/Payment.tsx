import PaymentForm from "@/processes/checkout/ui/PaymentForm";
import CheckoutSteps from "@/widgets/chechout-steps/CheckoutSteps";
import { Box, Typography } from "@mui/material";
import { FC } from "react";

const Payment: FC = () => {

	return (
		<Box flexDirection={"column"} marginX={10}>
			<CheckoutSteps currentStep={1} />
			<Typography variant="h4" style={{ padding: "1rem 0" }}>
				Оплата
			</Typography>
			<PaymentForm />
		</Box>
	);
};

export default Payment;
