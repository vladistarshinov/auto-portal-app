import React from "react";
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Button, Form, Collapse, Container, Dropdown } from 'bootstrap-4-react';
import { logout } from '../redux/actions/auth.actions';
import SearchBox from './SearchBox';

const Header = () => {
  
  const dispatch = useDispatch();
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  
/*   const updatedUserName = 
    JSON.parse(localStorage.getItem('updatedUserInfo')) !== null 
      ? JSON.parse(localStorage.getItem('updatedUserInfo')).name
      : null; */

  const logoutHandler = () => {
    dispatch(logout());
  };

    return (
        <header>
          <Navbar expand="lg" light bg="light" mb="3">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="text-capitalize" text="black-50" href="/">
                  <i 
                    className="fa fa-american-sign-language-interpreting mr-2" 
                    aria-hidden="true"
                  ></i>
                  IGadgetShop
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggler target="#navbarColor1" />
              <Collapse navbar id="navbarColor1">
                <Route render={({ history }) => <SearchBox history={history} />} />
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
                      {userInfo && userInfo.isAdmin && (
                        <>
                          <Dropdown.Item>Админ</Dropdown.Item>
                          <Dropdown.Divider />
                          <LinkContainer bg="light" text="dark" to="/admin/users">
                            <Dropdown.Item>Пользователи</Dropdown.Item>
                          </LinkContainer>
                          <LinkContainer bg="light" text="dark" to="/admin/products">
                            <Dropdown.Item>Товары</Dropdown.Item>
                          </LinkContainer>
                          <LinkContainer bg="light" text="dark" to="/admin/orders">
                            <Dropdown.Item>Заказы</Dropdown.Item>
                          </LinkContainer>
                          <Dropdown.Divider />
                          <Dropdown.Item>Пользователь</Dropdown.Item>
                          <Dropdown.Divider />
                        </>
                      )}
                      <LinkContainer bg="light" text="dark" to="/profile">
                        <Dropdown.Item>Личный кабинет</Dropdown.Item>
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
