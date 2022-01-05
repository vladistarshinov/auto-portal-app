import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button } from "bootstrap-4-react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../ui/components/Loader";
import { ORDER_UPDATE_STATUS_FOR_PAYING_RESET,
        ORDER_DELIVER_RESET } from '../redux/constants/order.constants'
import { getOrderDetails,
        updateStatusPayingOrder,
        updateStatusDeliveringOrder } from "../redux/actions/order.actions";
import { DateTimeFilter } from "../filters/DateTimeFilter.js";
import styled from 'styled-components';

const OrderProductActionsStatus = (
  { orderId, 
    order, 
    loadingPayingProcess, 
    successPayingProcess,
    loadingDeliveringProcess,
    successDeliveringProcess }
  ) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [sdkPayPalReady, setSdkPayPalReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkPayPalReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPayingProcess || successDeliveringProcess ) {
      dispatch({ type: ORDER_UPDATE_STATUS_FOR_PAYING_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkPayPalReady(true);
      }
    }
  }, [dispatch, successPayingProcess, successDeliveringProcess, orderId, order]);

  const payingActionHandler = () => {
    const payingButtons = document.getElementById("payingButtonElements");
    payingButtons.style.display === 'block' 
      ? payingButtons.style.display = 'none' 
      : payingButtons.style.display = 'block';
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(updateStatusPayingOrder(orderId, paymentResult))
  };

  const deliverHandler = () => {
    dispatch(updateStatusDeliveringOrder(order));
  };

  const StatusMessage = styled.div`
    display: flex;
    justify-content: center;
    max-width: 250px;
    padding-top: 0.9rem;

    &:last-child {
      padding-top: 0;
    }
  `;

  return (
    <>
      <Card>
        <ListGroup>
          {!order.isPaid && (
            <ListGroup.Item
              id="payingButtonElements"
              style={{ display: "none" }}
            >
              <Row>
                <Col>
                  {loadingPayingProcess && <Loader />}
                  {!sdkPayPalReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
      <StatusMessage className="text-center">
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
      <StatusMessage className="text-center">
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
        <div className="text-center">
          <Button type="button" dark onClick={deliverHandler}>
            Отправить
          </Button>
        </div>
      )}
      {!order.isPaid && (
        <div className="text-center">
          <Button type="button" dark onClick={payingActionHandler}>
            Оплатить
          </Button>
        </div>
      )}
    </>
  );
};

export default OrderProductActionsStatus;
