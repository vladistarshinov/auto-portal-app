import React from 'react'
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

const SelectInput = ({ value, onChange, countInStock }) => {

	const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));

	return (
    <Select
      labelId="demo-customized-select-label"
      id="demo-customized-select"
      value={value}
      onChange={onChange}
      input={<BootstrapInput />}
    >
      {[...Array(countInStock).keys()].map((x) => (
        <MenuItem key={x + 1} value={x + 1}>
          {x + 1}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectInput;
