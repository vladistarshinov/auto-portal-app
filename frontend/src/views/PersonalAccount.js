import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Card, Collapse, Table } from "bootstrap-4-react";
import { LinkContainer } from "react-router-bootstrap";
import { getUserProfile, updateUserProfile } from "../redux/actions/user.actions";
import { listOfMyOrders } from "../redux/actions/order.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { DateFilter } from "../filters/DateTimeFilter.js";

const Profile = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userProfile = useSelector(state => state.userProfile);
  const { loading, error, userDetails } = userProfile;
  console.log(userDetails);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const updatingUserProfile = useSelector(state => state.updatingUserProfile);
  const { success } = updatingUserProfile;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
        if (userDetails.name == undefined || !userDetails.name) {
            dispatch(getUserProfile('profile'));
            dispatch(listOfMyOrders());
        } else {
            setName(userDetails.name);
            setEmail(userDetails.email);
        }
    }
  }, [dispatch, history, userInfo, userDetails]);

  const submitHandler = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setMessage("Пароли не совпадают");
      } else {
        dispatch(updateUserProfile({ id: userDetails._id, name, email, password }));
        dispatch(getUserProfile('profile'));
      }
  };

  return (
    <Row>
        <Col md={3}>
            {/* <h2 id="accordionExample">Профиль</h2> */}
            <Card id="accordionExample">
                <Card.Header mb="0">
                    <Collapse.Button target="#collapseOne" id="headingOne" aria-expanded="true">
                        <h5>Профиль</h5>
                    </Collapse.Button>
                </Card.Header>
                <Collapse id="collapseOne" show aria-labelledby="headingOne" data-parent="#accordionExample">
                    <Card.Body>
                        {message && <Message variant="danger">{message}</Message>}
                        {success && <Message variant="success">Профиль изменен</Message>}
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant="danger">{error}</Message>
                        ) : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group>
                                    <label htmlFor="nameForm">Имя</label>
                                    <Form.Input 
                                        type="name" 
                                        id="nameForm" 
                                        placeholder="Введите имя и фамилию"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="emailForm">E-mail</label>
                                    <Form.Input 
                                        type="email" 
                                        id="emailForm" 
                                        placeholder="Введите email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="passwordForm">Пароль</label>
                                    <Form.Input 
                                        type="password" 
                                        id="passwordForm" 
                                        placeholder="Введите пароль"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="confirmPasswordForm">Подтверждение пароля</label>
                                    <Form.Input 
                                        type="password" 
                                        id="confirmPasswordForm" 
                                        placeholder="Подтвердите пароль"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" dark>Обновить</Button>
                            </Form>
                        )}
                    </Card.Body>
                </Collapse>
            </Card>
            {/* */}
        </Col>
        <Col md={9}>
            <h2>Мои заказы</h2>
            {loadingOrders ? <Loader /> : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
            ) : (
                <Table className="table-sm" striped bordered hover responsive>
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
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
                                            <i className="fas fa-check" style={{ color: 'green' }}></i><br />
                                            {/* <span>{order.paidAt.substring(0, 10)}</span> */}
                                            <span>{DateFilter(order.paidAt)}</span>
                                        </>
                                    ) : (
                                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        <>
                                            <i className="fas fa-check" style={{ color: 'green' }}></i>
                                            <span>{DateFilter(order.deliveredAt)}</span>
                                        </>
                                    ) : (
                                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm" variant="light">Подробнее</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  );
};

export default Profile;
