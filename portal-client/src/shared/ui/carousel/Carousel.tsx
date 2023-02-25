import { FC, useState } from "react"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
import { useTheme } from "@mui/material/styles"
import {
	Box,
	MobileStepper,
	Paper,
	Typography,
	Link,
	Button
} from "@mui/material"
import {
	KeyboardArrowLeft,
	KeyboardArrowRight
} from '@mui/icons-material'

import { IProduct } from "@/shared/api/types/product.types"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Carousel: FC<{ products: IProduct[] }> = ({ products }) => {
	const theme = useTheme()
	const [activeStep, setActiveStep] = useState(0)
	const maxSteps = products.length

	const handleStepChange = (step: number) => {
		setActiveStep(step)
	}

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}


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
				<Typography variant="h5">{products[activeStep]?.price} Р</Typography>
			</Paper>
			<AutoPlaySwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
			>
				{products.map((p: IProduct, index: number) => (
					<Box key={p._id} display='flex' justifyContent='center'>
						{Math.abs(activeStep - index) <= 2 ? (
								<Box
									component="img"
									sx={{
										height: 200,
										cursor: "grab",
										maxWidth: 300,
										overflow: "hidden",
										width: "100%",
									}}
									draggable="false"
									src={p.imageUrl}
									alt={p.title}
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
	)
}

export default Carousel
