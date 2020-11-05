import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";
import Register from "./views/Register";
import Login from "./views/Login";
import PersonalAccount from "./views/PersonalAccount";
import Shipping from './views/Shipping';
import Payment from './views/Payment';
import PlaceOrder from './views/PlaceOrder';
import Order from './views/Order';
import AdminUsersList from './views/AdminUsersList';
import AdminProductsList from './views/AdminProductsList';
import AdminOrderList from './views/AdminOrderList';
import styled from 'styled-components';

const App = () => {

  styled.html`
    box-sizing: border-box;
  `;

  styled.body`
    font: 1rem Helvetica;
    height: 100vh;
    margin: 0;
  `;

  const Main = styled.main`
    min-height: 80vh;
  `;

  return (
    <Router>
      <div className="grid-container">
        <Header />
        <Main className="py-3">
          <Container>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/profile" component={PersonalAccount} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/order/:id" component={Order} />
            <Route path="/admin/users" component={AdminUsersList} />
            <Route path="/admin/products" component={AdminProductsList} />
            <Route path="/admin/orders" component={AdminOrderList} />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/page/:pageNumber" component={Home} exact />
            <Route path="/search/:keyword/page/:pageNumber" component={Home} exact />
            <Route path="/" component={Home} exact />
          </Container>
        </Main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
