import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "bootstrap-4-react";
import { register } from "../redux/actions/auth.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const Register = ({ history, location, meta }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const submitHandler = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setMessage("Пароли не совпадают");
      } else {
        dispatch(register(name, email, password));
      }
  };

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
      if (userInfo) {
        history.push(redirect);
      }
  }, [history, redirect, userInfo]);

  return (
    <FormContainer>
      <h2>Регистрация</h2>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
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
          {meta.error &&
            meta.touched &&
            <div>
              {meta.error}
            </div>
          }
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
          {meta.error &&
            meta.touched &&
            <div>
              {meta.error}
            </div>
          }
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
        <Button type="submit" dark>Зарегистрироваться</Button>
      </Form>
      <Row className="py-3">
        <Col>
          Есть аккаунт?{' '} 
          <Link style={{ color: 'navy', textDecoration: 'none' }} to={redirect 
            ? `/login?redirect=${redirect}` 
            : '/login'}
          >Войти</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;