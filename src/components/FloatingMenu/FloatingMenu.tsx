import React, { useState, useEffect } from 'react';
import './FloatingMenu.css';

interface FloatingMenuProps {
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  onAboutClick,
  onContactClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-menu">
      {/* Кнопки меню */}
      <div className={`floating-menu__items ${isOpen ? 'floating-menu__items--active' : ''}`}>
        <button
          className="floating-menu__item floating-menu__item--about"
          onClick={() => {
            onAboutClick?.();
            setIsOpen(false);
          }}
          title="Обо мне"
        >
          <span className="floating-menu__icon">ℹ️</span>
        </button>
        <button
          className="floating-menu__item floating-menu__item--contact"
          onClick={() => {
            onContactClick?.();
            setIsOpen(false);
          }}
          title="Свяжитесь со мной"
        >
          <span className="floating-menu__icon">✉️</span>
        </button>
      </div>

      {/* Главная кнопка */}
      <button
        className={`floating-menu__toggle ${isOpen ? 'floating-menu__toggle--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Меню"
      >
        <span className="floating-menu__toggle-line floating-menu__toggle-line--1"></span>
        <span className="floating-menu__toggle-line floating-menu__toggle-line--2"></span>
        <span className="floating-menu__toggle-line floating-menu__toggle-line--3"></span>
      </button>
    </div>
  );
};

export default FloatingMenu;
