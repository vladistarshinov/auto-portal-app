import React from "react";
import { Navbar, Nav, Button, Form, Collapse, Container, Dropdown } from 'bootstrap-4-react';

const Header = () => {

    return (
        <header>
          <Navbar expand="lg" light bg="light" mb="3">
            <Container>
              <Navbar.Brand text="black-50" href="/">IGadgetShop</Navbar.Brand>
              <Navbar.Toggler target="#navbarColor1" />
              <Collapse navbar id="navbarColor1">
                <Form inline m="auto" my="2 lg-0">
                  <Form.Input type="search" placeholder="Поиск..." mr="sm-2" />
                  <Button outline info my="2 sm-0">Поиск</Button>
                </Form>
                <Navbar.Nav ml="auto">
                  <Nav.Item dropdown>
                    <Nav.Link dropdownToggle>Категории</Nav.Link>
                    <Dropdown.Menu>
                      <Dropdown.Item>Ноутбуки</Dropdown.Item>
                      <Dropdown.Item>Телефоны</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>Разное</Dropdown.Item>
                    </Dropdown.Menu>
                  </Nav.Item>
                  <Nav.ItemLink href="#">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Корзина
                  </Nav.ItemLink>
                  <Nav.ItemLink href="#">
                    <i className="fas fa-user mr-2"></i>
                    Авторизация
                  </Nav.ItemLink>
                </Navbar.Nav>
              </Collapse>
            </Container>
          </Navbar>
        </header>
    )
};

export default Header;
