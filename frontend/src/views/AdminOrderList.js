import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Modal, Button } from "bootstrap-4-react";
import { Form } from 'react-bootstrap';
import { listOfOrders } from "../redux/actions/admin.actions";
import FormContainer from "../components/FormContainer";
import Loader from "../ui/components/Loader";
import Message from "../components/Message";
import { DateFilter } from "../filters/DateTimeFilter.js";
import styled from 'styled-components';

const AdminOrderList = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, ordersInfo, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
        dispatch(listOfOrders());
    } else {
        history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const Title = styled.h2`
    padding: 1rem 0;
  `;

  const TickIcon = styled.i`
    color: green;
  `;

  const DaggerIcon = styled.i`
    color: red;
  `;

  const LinkToOrderDetails = {
    color: "navy",
    textDecoration: "none"
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <Title>Список заказов</Title>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table className="table-sm" striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Клиент</th>
                <th>Дата</th>
                <th>К оплате</th>
                <th>Статус оплаты</th>
                <th>Статус отправки</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ordersInfo.map((order) => (
                <tr className="text-center" key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{DateFilter(order.createdAt)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <>
                        <TickIcon
                          className="fas fa-check"
                        ></TickIcon>
                        <br />
                        {DateFilter(order.paidAt)}
                      </>
                    ) : (
                      <DaggerIcon className="fas fa-times"></DaggerIcon>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <>
                        <TickIcon
                          className="fas fa-check"
                        ></TickIcon>
                        <br />
                        {DateFilter(order.deliveredAt)}
                      </>
                    ) : (
                      <DaggerIcon className="fas fa-times"></DaggerIcon>
                    )}
                  </td>
                  <td>
                    <LinkContainer
                      style={LinkToOrderDetails}
                      to={`/order/${order._id}`}
                      >
                        <Button
                          className="btn-sm"
                          text="light"
                          dark
                          circle
                        >
                          <i className="fas fa-info"></i>
                        </Button>
                      </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )} 
    </>
  );
};

export default AdminOrderList;
