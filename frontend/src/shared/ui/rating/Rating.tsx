import {FC} from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

interface IRating {
	value: number
	color?: string
	fontSize?: string
}

const RatingItem: FC<IRating> = ({ value = 0, color = "orange", fontSize = "0.8rem" }) => {

	return (
		<Box
			sx={{
				"& > legend": { mt: 2 },
			}}
		>
			<Rating name="half-rating-read" value={value} precision={0.5} readOnly />
		</Box>
	);
};

export default RatingItem;