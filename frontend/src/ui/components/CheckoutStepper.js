import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { useHistory } from "react-router-dom";
import { steps } from "../../helpers/stepTitles";

export default function CheckoutStepper({ currentStep = 0 }) {
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(currentStep);
  const [completed] = React.useState({});

  const handleStep = (step, url) => () => {
    history.push(url);
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
