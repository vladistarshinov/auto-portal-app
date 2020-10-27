import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "bootstrap-4-react";
import { login } from "../redux/actions/user.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import AuthForm from "../components/AuthForm";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
  };

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
      if (userInfo) {
        history.push(redirect);
      }
  }, [history, redirect, userInfo]);

  return (
    <AuthForm>
      <h2>Авторизация</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        <Button dark>Войти</Button>
      </Form>
      <Row className="py-3">
        <Col>
          Новый пользователь? <Link to={redirect 
            ? `/register?redirect=${redirect}` 
            : '/register'}
          >Зарегистрироваться</Link>
        </Col>
      </Row>
    </AuthForm>
  );
};

export default Login;
