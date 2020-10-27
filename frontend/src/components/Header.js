import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Button, Form, Collapse, Container, Dropdown } from 'bootstrap-4-react';
import { logout } from '../redux/actions/auth.actions';

const Header = () => {
  
  const dispatch = useDispatch();
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

    return (
        <header>
          <Navbar expand="lg" light bg="light" mb="3">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="brand_title" text="black-50" href="/">
                  <i 
                    className="fa fa-american-sign-language-interpreting mr-2" 
                    aria-hidden="true"
                  ></i>
                  IGadgetShop
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggler target="#navbarColor1" />
              <Collapse navbar id="navbarColor1">
                <Form inline m="auto" my="2 lg-0">
                  <Form.Input type="search" placeholder="Поиск..." mr="sm-2" />
                  <Button outline dark my="2 sm-0">Поиск</Button>
                </Form>
                <Navbar.Nav ml="auto">
                  <Nav.Item dropdown>
                    <Nav.Link className="header__category" dropdownToggle>Категории</Nav.Link>
                    <Dropdown.Menu>
                      <LinkContainer bg="light" text="dark" to="/pc">
                        <Dropdown.Item>Ноутбуки</Dropdown.Item>
                      </LinkContainer>
                      <Dropdown.Item>Телефоны</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>Разное</Dropdown.Item>
                    </Dropdown.Menu>
                  </Nav.Item>
                  <LinkContainer to="/cart">
                    <Nav.ItemLink className="header__cart">
                      <i className="fas fa-shopping-cart mr-2"></i>
                      Корзина
                    </Nav.ItemLink>
                  </LinkContainer>
                  {userInfo ? (
                    <Nav.Item dropdown>
                    <Nav.Link className="header__category" dropdownToggle>{userInfo.name}</Nav.Link>
                    <Dropdown.Menu>
                      <LinkContainer bg="light" text="dark" to="/profile">
                        <Dropdown.Item>Профиль</Dropdown.Item>
                      </LinkContainer>
                      <LinkContainer bg="light" text="dark" to="/">
                        <Dropdown.Item onClick={logoutHandler}>Выйти</Dropdown.Item>
                      </LinkContainer>
                    </Dropdown.Menu>
                  </Nav.Item>
                  ) : (
                    <LinkContainer to="/login" className="header__login">
                      <Nav.ItemLink>
                        <i className="fas fa-user mr-2"></i>
                        Авторизация
                      </Nav.ItemLink>
                    </LinkContainer>
                  )}
                </Navbar.Nav>
              </Collapse>
            </Container>
          </Navbar>
        </header>
    )
};

export default Header;
