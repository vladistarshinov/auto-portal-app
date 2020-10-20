import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="grid-container">
        <Header />
        <Sidebar />
        <main>
          <h1>Добро пожаловать в магазин IGadgetShop</h1>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
