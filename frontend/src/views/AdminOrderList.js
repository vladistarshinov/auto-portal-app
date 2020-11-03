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
        <Col className="text-right">
          <Button 
            className="my-3" 
            data-toggle="modal" 
            data-target="#createModal" 
            light
          >
            <i className="fas fa-plus" style={{ paddingRight: '0.5rem' }}></i>
            <span>Добавить</span>
          </Button>
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
                <th>Статус доставки</th>
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
          {/* Modal */}
          <Modal id="editModal" fade>
            <Modal.Dialog style={{ maxWidth: '70vw' }}>
              <Modal.Content>
                <Modal.Header>
                  <Modal.Title>Изменение данных о товаре</Modal.Title>
                  <Modal.Close>
                    <span aria-hidden="true">&times;</span>
                  </Modal.Close>
                </Modal.Header> 
                 {/*  {loadingUpdateProduct && <Loader />}
                  {errorUpdateProduct && <Message variant="danger">{errorUpdateProduct}</Message>}
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : ( */}
                    <FormContainer>
                      <Form /* onSubmit={submitProductEditHandler} */>
                        <Modal.Body>      
                          <Form.Group>
                            <label>Название товара</label>
                            <Form.Control
                              type="name"
                              id="nameForm"
                              placeholder="Введите название товара"
                              /* value={name}
                              onChange={(e) => setName(e.target.value)} */
                            />
                          </Form.Group>
                          <Form.Group>
                            <label>Описание</label>
                            <Form.Control
                              type="text"
                              id="descriptionForm"
                              placeholder="Введите описание товара"
                              /* value={description}
                              onChange={(e) => setDescription(e.target.value)} */
                            />
                          </Form.Group>
                          <Form.Group>
                              <label>Фото товара</label>
                              <Form.Control
                                  type="text"
                                  id="photoForm"
                                  placeholder="Введите ссылку на фото"
                                  /* value={image}
                                  onChange={(e) => setImage(e.target.value)} */
                              />
                             {/*  <Form.File 
                                id="image-file"
                                label="Выберите файл"
                                custom
                                onChange={uploadFileHandler}
                              />
                              {uploading && <Loader />} */}
                          </Form.Group>
                          <Row>
                            <Col>
                              <Form.Group>
                                <label>Цена</label>
                                <Form.Control
                                    type="number"
                                    id="priceForm"
                                    placeholder="Введите цену"
                                    /* value={price}
                                    onChange={(e) => setPrice(e.target.value)} */
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group>
                                <label>Количество</label>
                                <Form.Control
                                    type="number"
                                    id="countInStockForm"
                                    placeholder="Введите кол-во"
                                    /* value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)} */
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Group>
                                <label>Категория</label>
                                <Form.Control
                                    type="text"
                                    id="categoryForm"
                                    placeholder="Введите категорию"
                                    /* value={category}
                                    onChange={(e) => setCategory(e.target.value)} */
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group>
                                <label>Бренд</label>
                                <Form.Control
                                    type="text"
                                    id="brandForm"
                                    placeholder="Введите бренд"
                                    /* value={brand}
                                    onChange={(e) => setBrand(e.target.value)} */
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row 
                            style={{
                            display: "flex",
                            justifyContent: "center"
                            }}
                          >
                            <Button secondary data-dismiss="modal" style={{ marginRight: '0.3rem' }}>
                              Закрыть
                            </Button>
                            <Button type="submit" dark>Обновить</Button>
                          </Row>
                        </Modal.Body>
                      </Form>
                    </FormContainer>
                {/*   )} */}
              </Modal.Content>
            </Modal.Dialog>
          </Modal>
        </>
      )} 
    </>
  );
};

export default AdminOrderList;
