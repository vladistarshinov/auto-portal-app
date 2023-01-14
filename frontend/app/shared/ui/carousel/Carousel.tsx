import {FC, useState} from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousel: FC<{ products: any }> = ({ products }) => {
	const theme = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = products.length;

	const handleStepChange = (step: any) => {
		setActiveStep(step);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<Typography variant="h6">{products[activeStep]?.title}</Typography>
				<Typography variant="h5">{products[activeStep]?.price} $</Typography>
			</Paper>
			<AutoPlaySwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
			>
				{products.map((step: any, index: number) => (
					<Box key={step._id}>
						{Math.abs(activeStep - index) <= 2 ? (
								<Box
									component="img"
									sx={{
										height: 255,
										cursor: "grab",
										maxWidth: 400,
										overflow: "hidden",
										width: "100%",
									}}
									draggable="false"
									src={step.imageUrl}
									alt={step.title}
								/>
						) : null}
					</Box>
				))}
			</AutoPlaySwipeableViews>
			<MobileStepper
				sx={{ bgcolor: "#f8f9fa", display: "flex", justifyContent: "center" }}
				steps={maxSteps}
				position="static"
				activeStep={activeStep}
				nextButton={
					<Box></Box>
				}
				backButton={
					<Box></Box>
				}
			/>
		</Box>
	);
};

export default Carousel;
