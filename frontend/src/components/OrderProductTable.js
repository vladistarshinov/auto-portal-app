import React from "react";
import { Col, ListGroup, Figure, Collapse, Button } from "bootstrap-4-react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { DateTimeFilter } from "../filters/DateTimeFilter.js";

const OrderProductTable = ({ order }) => {
    return (
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
    );
};

export default OrderProductTable;
