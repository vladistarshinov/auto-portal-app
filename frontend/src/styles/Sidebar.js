import React from "react";

const Sidebar = () => {
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
      };
      
    return (
        <aside className="sidebar">
          <h3>Категории</h3>
          <button className="sidebar__btn-close" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Телефоны</a>
            </li>
            <li>
              <a href="index.html">Ноутбуки</a>
            </li>
          </ul>
        </aside>
    )
};

export default Sidebar;
