import { Box, Step, StepButton, Stepper } from "@mui/material";
import { steps } from "helpers/stepTitles";
import { useState } from "react";

const CheckoutStepper = ({ currentStep = 0 }) =>  {
	//const history = useHistory();
	const [activeStep, setActiveStep] = useState(currentStep);
	const [completed] = useState({} as any);

	const handleStep = (step: any, url: string) => () => {
		//history.push(url);
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
