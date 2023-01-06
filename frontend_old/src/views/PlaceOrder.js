import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Message from "../ui/components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../redux/actions/order.actions";

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.productsPrice = addDecimal(
    cart.cartProductItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  );

  cart.shippingPrice = addDecimal(cart.productsPrice > 300 ? 0 : 100);
  cart.taxPrice = addDecimal(Number(0.13 * cart.productsPrice));
  cart.totalPrice = addDecimal(
    Number(cart.productsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
  );
  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartProductItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        productsPrice: cart.productsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const LinkToProductDetails = {
    color: "navy",
    textDecoration: "none",
  };

  return (
    <>
      <CheckoutSteps currentStep={2} />
      <Box sx={{ display: { md: "flex" } }} justifyContent="center">
        <Grid sm={12} md={8} lg={9}>
          <List>
            <ListItem
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <h2>Доставка</h2>
              <p>
                <strong>Адрес: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListItem>

            <ListItem
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <h2 style={{ padding: "1rem 0" }}>Оплата</h2>
              <p>
                <strong>Способ: </strong>
                {cart.paymentMethod}
              </p>
            </ListItem>

            <ListItem
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <h2>Заказ</h2>
              {cart.cartProductItems.length === 0 ? (
                <Message>Ваша корзина пуста</Message>
              ) : (
                <Box>
                  {cart.cartProductItems.map((item, index) => (
                    <Box
                      display="inline-flex"
                      justifyContent="space-between"
                      style={{ width: "100%", marginTop: "20px" }}
                      key={index}
                    >
                      <Box md={3} lg={3}>
                        <CardMedia
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{ width: { sm: "200px", xs: "100px" } }}
                        />
                      </Box>
                      <Box ml={2}>
                        <Link
                          style={LinkToProductDetails}
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </Box>
                      <Box md={4} lg={4} ml={2}>
                        {item.quantity} * ${item.price} = $
                        {item.quantity * item.price}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </ListItem>
          </List>
        </Grid>
        <Grid sm={12} md={4} lg={3} ml={3}>
          <Paper>
            <List>
              <ListItem>
                <h4>Суммарный заказ</h4>
              </ListItem>
              <ListItem>
                <Grid>
                  <Box>Товары</Box>
                  <Box>${cart.productsPrice}</Box>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid>
                  <Box>Доставка</Box>
                  <Box>${cart.shippingPrice}</Box>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid>
                  <Box>Налог</Box>
                  <Box>${cart.taxPrice}</Box>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid>
                  <Box>
                    <strong>Итого</strong>
                  </Box>
                  <Box>
                    <strong>${cart.totalPrice}</strong>
                  </Box>
                </Grid>
              </ListItem>
              <ListItem>
                {error && <Message cariant="error">{error}</Message>}
              </ListItem>
              <ListItem>
                <Button
                  variant="outlined"
                  color="inherit"
                  disabled={cart.cartProductItems === 0}
                  onClick={placeOrderHandler}
                >
                  Отправить
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Box>
    </>
  );
};

export default PlaceOrder;
