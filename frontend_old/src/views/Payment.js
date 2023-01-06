import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../redux/actions/cart.actions";

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <Box flexDirection={"column"}>
      <CheckoutSteps currentStep={1} />
      <Typography variant="h4" style={{ padding: "1rem 0" }}>
        Оплата
      </Typography>
      <Box>
        <FormControl
          component="fieldset"
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormLabel component="legend">Выберите способ оплаты</FormLabel>
          <RadioGroup
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="PayPal"
              control={<Radio />}
              label="PayPal"
            />
            <FormControlLabel
              value="Кредитная карта"
              control={<Radio />}
              label="Кредитная карта"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Button
        variant="outlined"
        sx={{ mt: 3 }}
        color="inherit"
        onClick={submitHandler}
      >
        Продолжить
      </Button>
    </Box>
  );
};

export default Payment;
