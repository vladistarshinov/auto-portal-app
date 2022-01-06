import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Link from "@mui/material/Link";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousel = ({ products }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = products.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        flexGrow: 1,
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 70,
          py: 2,
          bgcolor: "#f8f9fa",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">{products[activeStep]?.name}</Typography>
        <Typography variant="h5">{products[activeStep]?.price} $</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {products.map((step, index) => (
          <Box key={step.name}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Link href={`/product/${step._id}`}>
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.image}
                  alt={step.name}
                />
              </Link>
            ) : null}
          </Box>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{ bgcolor: "#f8f9fa", display: "flex", justifyContent: "center" }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        onClick={handleStepChange}
      />
    </Box>
  );
};

export default Carousel;
