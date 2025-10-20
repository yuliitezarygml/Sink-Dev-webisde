import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Sink Dev</h1>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link">Главная</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">О нас</a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link">Услуги</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">Контакты</a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="btn btn-primary">Войти</button>
          <button className="btn btn-secondary">Регистрация</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
