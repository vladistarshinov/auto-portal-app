import React from "react";
import { Col, ListGroup, Figure } from "bootstrap-4-react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { DateTimeFilter } from "../filters/DateTimeFilter.js";
import styled from 'styled-components';

const OrderProductTable = ({ order }) => {

    const TitleData = styled.strong`
        color: grey;
    `;

    const EmailAddress = styled.a`
        color: navy;
        text-decoration: none;
    `;

    const FigureImage = {
        width: '4.5rem',
        height: '3rem'
    };

    const ProductName = {
        color: 'navy',
        textDecoration: 'none'
    };

    return (
        <Col md={9}>
            <ListGroup flush>
                <ListGroup.Item>
                <TitleData>Клиент: </TitleData>{" "}
                {order.user.name}{" "}
                <EmailAddress
                    href={`mailto:${order.user.email}`}
                >
                    ({order.user.email})
                </EmailAddress>
                <br />
                <TitleData>Дата создания заказа:{" "}</TitleData>
                {DateTimeFilter(order.createdAt)}
                <br />
                <TitleData>Адрес доставки:{" "}</TitleData>
                {order.shippingAddress.country},{" "}
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.address}
                <br />
                <TitleData>Способ оплаты:{" "}</TitleData>
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
                                        style={FigureImage}
                                        src={item.image}
                                        alt={item.name}
                                        fluid
                                        rounded
                                    />
                                </td>
                                <td>
                                    <Link
                                        style={ProductName}
                                        to={`/product/${item.product}`}
                                    >{item.name}</Link>
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
