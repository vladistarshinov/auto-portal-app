import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/actions/cart.actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <Box>
      <CheckoutSteps currentStep={0} />
      <Typography variant="h4" style={{ padding: "1rem 0" }}>
        Доставка
      </Typography>
      <Box>
        <TextField
          sx={{ mt: 3 }}
          label="Адрес"
          id="outlined-basic"
          size="small"
          fullWidth
          type="text"
          placeholder="Введите адрес"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          sx={{ mt: 3 }}
          label="Город"
          id="outlined-basic"
          size="small"
          fullWidth
          type="text"
          placeholder="Введите город"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          sx={{ mt: 3 }}
          label="Почтовый индекс"
          id="outlined-basic"
          size="small"
          fullWidth
          type="text"
          placeholder="Введите почтовый индекс"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <TextField
          sx={{ mt: 3 }}
          label="Страна"
          id="outlined-basic"
          size="small"
          fullWidth
          type="text"
          placeholder="Введите страну"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <Button
          variant="outlined"
          sx={{ mt: 3 }}
          color="inherit"
          onClick={submitHandler}
        >
          Продолжить
        </Button>
      </Box>
    </Box>
  );
};

export default Shipping;
