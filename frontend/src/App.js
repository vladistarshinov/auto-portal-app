import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import ProductDetail from "./views/ProductDetail";

const App = () => {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/" component={Home} exact />
            <Route path="/product/:id" component={ProductDetail} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
