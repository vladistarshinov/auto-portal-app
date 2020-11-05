import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Card, Collapse } from "bootstrap-4-react";
import { getUserProfile, updateUserProfile } from "../redux/actions/user.actions";
import { listOfMyOrders } from "../redux/actions/order.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import MyOrderList from '../components/MyOrderList';

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
                                    <label htmlFor="passwordForm">Новый пароль</label>
                                    <Form.Input 
                                        type="password" 
                                        id="passwordForm" 
                                        placeholder="Введите новый пароль"
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
        <MyOrderList loadingOrders={loadingOrders} errorOrders={errorOrders} orders={orders} />
    </Row>
  );
};

export default Profile;