import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { PayPalButton } from "react-paypal-button-v2";
import Paper from "@mui/material/Paper";
import Message from "../ui/components/Message";
import Loader from "../ui/components/Loader";
import {
  ORDER_UPDATE_STATUS_FOR_PAYING_RESET,
  ORDER_DELIVER_RESET,
} from "../redux/constants/order.constants";
import {
  getOrderDetails,
  updateStatusPayingOrder,
  updateStatusDeliveringOrder,
} from "../redux/actions/order.actions";
import { DateTimeFilter } from "../filters/DateTimeFilter.js";
import { styled } from "@mui/material/styles";
import { addPayPalScript } from "../utils/addPaypalScript";

const OrderProductActionsStatus = ({
  orderId,
  order,
  loadingPayingProcess,
  successPayingProcess,
  loadingDeliveringProcess,
  successDeliveringProcess,
}) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [sdkPayPalReady, setSdkPayPalReady] = useState(false);

  useEffect(() => {
    if (!order || successPayingProcess || successDeliveringProcess) {
      dispatch({ type: ORDER_UPDATE_STATUS_FOR_PAYING_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript(setSdkPayPalReady);
      } else {
        setSdkPayPalReady(true);
      }
    }
  }, [
    dispatch,
    successPayingProcess,
    successDeliveringProcess,
    orderId,
    order,
  ]);

  const payingActionHandler = () => {
    const payingButtons = document.getElementById("payingButtonElements");
    payingButtons.style.display === "block"
      ? (payingButtons.style.display = "none")
      : (payingButtons.style.display = "block");
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(updateStatusPayingOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(updateStatusDeliveringOrder(order));
  };

  const StatusMessage = styled(Box)({
    display: "flex",
    justifyContent: "center",
    maxWidth: "250px",
    paddingTop: "0.9rem",
    marginBottom: "1rem",

    "&:last-child": {
      paddingTop: 0,
    },
  });

  return (
    <>
      <Paper>
        <List>
          {!order.isPaid && (
            <ListItem id="payingButtonElements" style={{ display: "none" }}>
              <Box>
                <Grid>
                  {loadingPayingProcess && <Loader />}
                  {!sdkPayPalReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </Grid>
              </Box>
            </ListItem>
          )}
        </List>
      </Paper>
      <StatusMessage>
        {order.isPaid ? (
          <Message variant="success">
            Оплачено
            <br />
            {DateTimeFilter(order.paidAt)}
          </Message>
        ) : (
          <Message variant="error">Не оплачено</Message>
        )}
      </StatusMessage>
      <StatusMessage>
        {order.isPaid &&
          (order.isDelivered ? (
            <Message variant="info">
              Отправлено
              <br />
              {DateTimeFilter(order.deliveredAt)}
            </Message>
          ) : (
            <Message variant="error">Не отправлено</Message>
          ))}
      </StatusMessage>
      {loadingDeliveringProcess && <Loader />}
      {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
        <Box display="flex" justifyContent="center">
          <Button variant="outlined" onClick={deliverHandler}>
            Отправить
          </Button>
        </Box>
      )}
      {!order.isPaid && (
        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="inherit"
            onClick={payingActionHandler}
            sx={{ mb: "1rem" }}
          >
            Оплатить
          </Button>
        </Box>
      )}
    </>
  );
};

export default OrderProductActionsStatus;
