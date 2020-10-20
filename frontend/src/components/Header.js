import React from "react";

const Header = () => {
    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
      };

    return (
        <header className="header">
            <div className="header__brand">
              <button onClick={openMenu}>&#9776;</button>
              <a href="index.html">IGadgetShop</a>
            </div>
            <div className="header__links">
              <a href="cart.html">Корзина</a>
              <a href="login.html">Регистрация</a>
            </div>
        </header>
    )
};

export default Header;
