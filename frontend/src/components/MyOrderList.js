import React from "react";
import { Col, Button, Table } from "bootstrap-4-react";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { DateFilter } from "../filters/DateTimeFilter.js";
import styled from 'styled-components';

const MyOrderList = ({ loadingOrders, errorOrders, orders }) => {

    const TickIcon = styled.i`
        color: green;
    `;

    const DaggerIcon = styled.i`
        color: red;
    `;

    return (
        <Col md={9}>
            <h2 style={{ padding: '1rem 0' }}>Мои заказы</h2>
            {loadingOrders ? <Loader /> : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
            ) : (
                <Table className="table-sm" striped bordered hover responsive>
                    <thead>
                        <tr className="text-center">
                            <th>Номер заказа</th>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th>Статус оплаты</th>
                            <th>Статус доставки</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr className="text-center" key={order._id}>
                                <td>{order._id}</td>
                                <td>{DateFilter(order.createdAt)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        <>
                                            <TickIcon className="fas fa-check"></TickIcon><br />
                                            {/* <span>{order.paidAt.substring(0, 10)}</span> */}
                                            <span>{DateFilter(order.paidAt)}</span>
                                        </>
                                    ) : (
                                        <DaggerIcon className="fas fa-times"></DaggerIcon>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        <>
                                            <TickIcon className="fas fa-check"></TickIcon><br />
                                            <span>{DateFilter(order.deliveredAt)}</span>
                                        </>
                                    ) : (
                                        <DaggerIcon className="fas fa-times" style={{ color: 'red' }}></DaggerIcon>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button type="button" dark className="btn-sm" variant="light">Подробнее</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    );
};

export default MyOrderList;
