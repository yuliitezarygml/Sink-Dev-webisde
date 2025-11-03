import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/NotFound.css';
import catImage from '../img/cat.png';

const NotFound: React.FC = () => {
  const location = useLocation();
  const isErrorPage = location.pathname === '/error';

  const getErrorMessage = () => {
    if (isErrorPage) {
      return 'Ошибка подключения к серверу - сервер не отвечает!';
    }
    return 'Страница не найдена - такой адрес не существует!';
  };

  return (
    <div className="not-found-container">
      <div className="error-number">404</div>
      <div className="error-image">
        <img src={catImage} alt="404 cat" />
        <h1 className="error-text">ОКАК</h1>
      </div>
      <div className="error-description">
        <p>{getErrorMessage()}</p>
        {!isErrorPage && (
          <p style={{ fontSize: '0.9em', opacity: 0.8, marginBottom: '20px' }}>
            Убедитесь, что Strapi сервер запущен на http://localhost:1337
          </p>
        )}
       <a href="/" className="back-button">Вернуться на главную</a>
      </div>
    </div>
  );
};

export default NotFound;
