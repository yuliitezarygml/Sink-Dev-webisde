import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Данные для входа:', formData);
  };

    return (
    <div className="auth-page">
      <div className="auth-page__container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-form__title">Вход</h2>
          <p className="auth-form__subtitle">Добро пожаловать обратно</p>
          
          <div className="auth-form__group">
            <input 
              type="email" 
              className="auth-form__input"
              placeholder="Email" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          
          <div className="auth-form__group">
            <input 
              type="password" 
              className="auth-form__input"
              placeholder="Пароль" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" className="auth-form__button">Войти</button>
          
          <div className="auth-form__footer">
            <p>Нет аккаунта? <Link to="/register" className="auth-form__link">Зарегистрироваться</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
