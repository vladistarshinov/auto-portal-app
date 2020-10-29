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

const Order = (props) => {
  const dispatch = useDispatch();

  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const generateOrderPdfHandler = () => {
    console.log('print');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div>
            <div className="text-center" style={{ color: "grey" }}>
              <i
                className="fa fa-american-sign-language-interpreting mr-2"
                style={{ fontSize: "2rem" }}
                aria-hidden="true"
              ></i>
              <p>IGadgetShop</p>
            </div>
            <h4 className="text-center" style={{ color: "grey" }}>
              Заказ № {order._id}
            </h4>
            <Row>
              <Col md={12}>
                <ListGroup flush>
                  <ListGroup.Item>
                    <strong style={{ color: "grey" }}>Клиент: </strong>{" "}
                    {order.user.name}
                    <br />
                    <strong style={{ color: "grey" }}>Email:</strong>{" "}
                    <a 
                        href={`mailto:${order.user.email}`}  
                        style={{
                            color: "navy",
                            textDecoration: "none",
                        }}
                    >{order.user.email}</a>
                    <br />
                    <strong style={{ color: "grey" }}>Дата создания заказа:{" "}</strong>{DateTimeFilter(order.createdAt)}
                    <br />
                    <strong style={{ color: "grey" }}>Адрес доставки: </strong>
                    {order.shippingAddress.country},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.address}
                    <br />
                    <strong style={{ color: "grey" }}>Способ оплаты: </strong>
                    {order.paymentMethod}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {order.orderItems.length === 0 ? (
                      <Message>Заказ пуст</Message>
                    ) : (
                      <Row>
                        <Col md={9}>
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
                                          width: "5rem",
                                          height: "4rem",
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
                        </Col>
                        <Col md={3}>
                          <Card>
                            <ListGroup className="text-center" flush>
                              <ListGroup.Item>
                                <h6 style={{ color: "grey" }}>
                                  Расчетная сумма
                                </h6>
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
                          
                          <div className="text-center" style={{ display: 'flex', justifyContent: 'center', maxWidth: '250px', paddingTop: '0.9rem' }}>
                            {order.isPaid ? (
                              <Message variant="success">Оплачено<br />{DateTimeFilter(order.paidAt)}</Message>
                            ) : (
                              <Message variant="danger">Не оплачено</Message> 
                            )} 
                          </div>
                          <div className="text-center" style={{ display: 'flex', justifyContent: 'center', maxWidth: '250px' }}>
                            {order.isPaid && (
                              order.isDelivered ? (
                                <Message variant="success">Доставлено<br />{DateTimeFilter(order.deliveredAt)}</Message>
                              ) : (
                                <Message variant="danger">Не доставлено</Message> 
                              )
                            )} 
                          </div>
                    
                        </Col>
                      </Row>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
          <div className="text-center">
            <Button 
                type="button"
                dark
                onClick={generateOrderPdfHandler}
            >Распечатать чек
            </Button>
          </div> 
        </>
      )}
    </>
  );
};

export default Order;
