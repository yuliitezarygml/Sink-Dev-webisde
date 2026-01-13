import React from 'react';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__logo">
            <h2>Sinkdev-Photo</h2>
          </div>
          <div className="footer__info">
            <p>© 2025 Sinkdev-Photo. Все права защищены.</p>
            <p>Фотограф: Balti IT | Студия: Nortek</p>
          </div>
        </div>
        <div className="footer__social">
          <p>Свяжитесь с нами</p>
          <div className="footer__links">
            <a href="#contact">Контакты</a>
            <a href="#about">О нас</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;