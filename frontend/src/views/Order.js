import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button } from "bootstrap-4-react";
import { Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../ui/components/Loader";
import { ORDER_UPDATE_STATUS_FOR_PAYING_RESET,
        ORDER_DELIVER_RESET } from '../redux/constants/order.constants';
import { CART_RESET_PRODUCTS } from '../redux/constants/cart.constants'
import { getOrderDetails } from "../redux/actions/order.actions";
import OrderProductTable from '../components/OrderProductTable';
import OrderProductActionsStatus from '../components/OrderProductActionsStatus';

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Order = (props) => {
  const dispatch = useDispatch();

  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPayingStatus = useSelector((state) => state.orderPayingStatus);
  const {
    loading: loadingPayingProcess,
    success: successPayingProcess,
  } = orderPayingStatus;

  const orderDeliveringStatus = useSelector((state) => state.orderDeliveringStatus);
  const {
    loading: loadingDeliveringProcess,
    success: successDeliveringProcess,
  } = orderDeliveringStatus;

  useEffect(() => {
    if (!order || successPayingProcess || successDeliveringProcess ) {
      dispatch({ type: ORDER_UPDATE_STATUS_FOR_PAYING_RESET });
      dispatch({ type: CART_RESET_PRODUCTS })
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [orderId]);

  const generateOrderPdfHandler = () => {
    const printOrder = document.getElementById("printOrder");
    const pdf = new jsPDF("p", "mm", "a4"),
      pdfInternals = pdf.internal,
      pdfPageSize = pdfInternals.pageSize,
      pdfPageWidth = pdfPageSize.width * 0.8;
    pdf.setFontSize(8);

    html2canvas(printOrder).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      pdf.addImage(image, "PNG", 20, 30, pdfPageWidth, 0);
      pdf.save(`${order.user.name}_${order._id}`);
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <div id="printOrder">
            <div className="text-center" style={{ color: "grey" }}>
              <i
                className="fa fa-american-sign-language-interpreting mr-2"
                style={{ fontSize: "2rem" }}
                aria-hidden="true"
              ></i>
              <p>IGadgetShop</p>
            </div>
            <h5 className="text-center" style={{ color: "grey" }}>
              Заказ № {order._id}
            </h5>
            <Row>
              <Col>
                <Row>
                  <OrderProductTable order={order} />
                  <Col md={3}>
                    <Card>
                      <ListGroup flush>
                        <ListGroup.Item className="text-center">
                          <h6 style={{ color: "grey" }}>Расчетная сумма</h6>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Товары</Col>
                            <Col>${order.productsPrice}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Доставка</Col>
                            <Col>${order.shippingPrice}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Налог</Col>
                            <Col>${order.taxPrice}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <strong>Итого</strong>
                            </Col>
                            <Col>
                              <strong>${order.totalPrice}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                    <OrderProductActionsStatus
                      orderId={orderId}
                      order={order}
                      loadingPayingProcess={loadingPayingProcess}
                      loadingDeliveringProcess={loadingDeliveringProcess}
                      successPayingProcess={successPayingProcess}
                      successDeliveringProcess={successDeliveringProcess}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="text-center">
            <Button type="button" dark onClick={generateOrderPdfHandler}>
              Распечатать чек
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Order;
