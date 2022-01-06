import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const RatingItem = ({ value = 0, color = "orange", fontSize = "0.8rem" }) => {
  //const [value, setValue] = React.useState(2);

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
