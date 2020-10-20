import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="grid-container">
        <Header />
        <main className="py-3">
          <Container>
            <h3>Добро пожаловать в магазин IGadgetShop</h3>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
