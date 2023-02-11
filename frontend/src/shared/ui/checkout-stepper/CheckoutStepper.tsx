import { Box, Step, StepButton, Stepper } from "@mui/material";
import { steps } from "@/shared/helpers/stepTitles";
import { useRouter } from "next/router";
import { useState } from "react";

const CheckoutStepper = ({ currentStep = 0 }) =>  {
	const router = useRouter();
	const [activeStep, setActiveStep] = useState(currentStep);
	const [completed] = useState({} as any);

	const handleStep = (step: any, url: string) => () => {
		router.push(url);
		setActiveStep(step);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper alternativeLabel activeStep={activeStep}>
				{steps.map((step, index) => (
					<Step key={step.label} completed={completed[index]}>
						<StepButton color="inherit" onClick={handleStep(index, step.url)}>
							{step.label}
						</StepButton>
					</Step>
				))}
			</Stepper>
		</Box>
	);
}

export default CheckoutStepper
