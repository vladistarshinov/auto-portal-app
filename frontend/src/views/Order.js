import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Figure, Button } from "bootstrap-4-react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails } from "../redux/actions/order.actions";
import DateTimeFilter from "../filters/DateTimeFilter.js";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Order = (props) => {
  const dispatch = useDispatch();

  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

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
        <Message variant="danger">{error}</Message>
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
                  <Col md={9}>
                    <ListGroup flush>
                      <ListGroup.Item>
                        <strong style={{ color: "grey" }}>Клиент: </strong>{" "}
                        {order.user.name}{" "}
                        <a
                          href={`mailto:${order.user.email}`}
                          style={{
                            color: "navy",
                            textDecoration: "none",
                          }}
                        >
                          ({order.user.email})
                        </a>
                        <br />
                        <strong style={{ color: "grey" }}>
                          Дата создания заказа:{" "}
                        </strong>
                        {DateTimeFilter(order.createdAt)}
                        <br />
                        <strong style={{ color: "grey" }}>
                          Адрес доставки:{" "}
                        </strong>
                        {order.shippingAddress.country},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.address}
                        <br />
                        <strong style={{ color: "grey" }}>
                          Способ оплаты:{" "}
                        </strong>
                        {order.paymentMethod}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {order.orderItems.length === 0 ? (
                          <Message>Заказ пуст</Message>
                        ) : (
                          <ListGroup flush>
                            <MDBTable className="text-center" hover>
                              <MDBTableHead>
                                <tr>
                                  <th>#</th>
                                  <th>Фото товара</th>
                                  <th>Название</th>
                                  <th>Кол-во</th>
                                  <th>Цена за шт.</th>
                                  <th>Общая сумма</th>
                                </tr>
                              </MDBTableHead>
                              <MDBTableBody>
                                {order.orderItems.map((item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <Figure.Image
                                        style={{
                                          width: "4.5rem",
                                          height: "3rem",
                                        }}
                                        src={item.image}
                                        alt={item.name}
                                        fluid
                                        rounded
                                      />
                                    </td>
                                    <td>
                                      <Link
                                        style={{
                                          color: "navy",
                                          textDecoration: "none",
                                        }}
                                        to={`/product/${item.product}`}
                                      >
                                        {item.name}
                                      </Link>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>${item.quantity * item.price}</td>
                                  </tr>
                                ))}
                              </MDBTableBody>
                            </MDBTable>
                          </ListGroup>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
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
                    <div
                      className="text-center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        maxWidth: "250px",
                        paddingTop: "0.9rem",
                      }}
                    >
                      {order.isPaid ? (
                        <Message variant="success">
                          Оплачено
                          <br />
                          {DateTimeFilter(order.paidAt)}
                        </Message>
                      ) : (
                        <Message variant="danger">Не оплачено</Message>
                      )}
                    </div>
                    <div
                      className="text-center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        maxWidth: "250px",
                      }}
                    >
                      {order.isPaid &&
                        (order.isDelivered ? (
                          <Message variant="success">
                            Доставлено
                            <br />
                            {DateTimeFilter(order.deliveredAt)}
                          </Message>
                        ) : (
                          <Message variant="danger">Не доставлено</Message>
                        ))}
                    </div>
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
