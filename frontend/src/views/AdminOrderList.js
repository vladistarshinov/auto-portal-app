import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Modal, Button } from "bootstrap-4-react";
import { Form } from 'react-bootstrap';
import { listOfOrders } from "../redux/actions/admin.actions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { DateFilter } from "../filters/DateTimeFilter.js";

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

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Список заказов</h2>
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
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                        <br />
                        {DateFilter(order.paidAt)}
                      </>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <>
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                        <br />
                        {DateFilter(order.deliveredAt)}
                      </>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer
                      style={{
                          color: "navy",
                          textDecoration: "none",
                      }}
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
