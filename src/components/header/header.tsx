import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <h1>Sinkdev-Photo</h1>
        </Link>
        <nav className="header__nav">
          <ul className="header__menu">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'header__link--active' : ''}>
                Главная
              </Link>
            </li>
            <li>
              <Link to="/gallery" className={location.pathname === '/gallery' ? 'header__link--active' : ''}>
                Галерея
              </Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'header__link--active' : ''}>
                О нас
              </Link>
            </li>
          </ul>

          <div className="header__auth">
            <Link to="/login" className="auth-btn auth-btn--login">
              Вход
            </Link>
            <Link to="/register" className="auth-btn auth-btn--register">
              Регистрация
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
