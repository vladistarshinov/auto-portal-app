import React from "react";
import CheckoutStepper from "../ui/components/CheckoutStepper";
import Box from "@mui/material/Box";

const CheckoutSteps = ({ currentStep }) => {
  return (
    <Box sx={{ my: 3 }}>
      <CheckoutStepper currentStep={currentStep} />
    </Box>
  );
};

export default CheckoutSteps;
