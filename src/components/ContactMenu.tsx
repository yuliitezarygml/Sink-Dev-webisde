import React, { useState, useRef, useEffect } from 'react';
import '../styles/ContactMenu.css';

interface ContactMenuProps {
  photographerName?: string;
  photographerEmail?: string;
}

const ContactMenu: React.FC<ContactMenuProps> = ({
  photographerName = 'Фотограф',
  photographerEmail = 'contact@ghiframe.studio',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрываем меню при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Закрываем меню при нажатии ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="contact-menu-container" ref={menuRef}>
      {/* Кнопка "Написать фотографу" */}
      <button
        className="contact-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Контактное меню"
      >
        💬
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="contact-menu-dropdown">
          {/* Email */}
          <a
            href={`mailto:${photographerEmail}`}
            className="contact-menu-item email-item"
            onClick={() => setIsOpen(false)}
          >
            <span className="icon">✉️</span>
            <span className="text">
              <strong>Email</strong>
              <small>{photographerEmail}</small>
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=Привет,%20${encodeURIComponent(photographerName)}!%20Интересуюсь%20вашей%20фотогалереей.`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-menu-item whatsapp-item"
            onClick={() => setIsOpen(false)}
          >
            <span className="icon">📱</span>
            <span className="text">
              <strong>WhatsApp</strong>
              <small>Напишите в WhatsApp</small>
            </span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/ghiframe_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-menu-item telegram-item"
            onClick={() => setIsOpen(false)}
          >
            <span className="icon">✈️</span>
            <span className="text">
              <strong>Telegram</strong>
              <small>@ghiframe_studio</small>
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/ghiframe.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-menu-item instagram-item"
            onClick={() => setIsOpen(false)}
          >
            <span className="icon">📸</span>
            <span className="text">
              <strong>Instagram</strong>
              <small>@ghiframe.studio</small>
            </span>
          </a>

          {/* Телефон */}
          <a
            href="tel:+7-999-999-99-99"
            className="contact-menu-item phone-item"
            onClick={() => setIsOpen(false)}
          >
            <span className="icon">☎️</span>
            <span className="text">
              <strong>Телефон</strong>
              <small>+7 (999) 999-99-99</small>
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

export default ContactMenu;
