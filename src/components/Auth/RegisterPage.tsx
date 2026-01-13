import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // Используем общие стили из LoginPage.css

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    console.log('Данные регистрации:', formData);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-form__title">Регистрация</h2>
          <p className="auth-form__subtitle">Создайте свой аккаунт</p>
          
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

          <div className="auth-form__group">
            <input 
              type="password" 
              className="auth-form__input"
              placeholder="Подтвердите пароль" 
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" className="auth-form__button">Создать аккаунт</button>
          
          <div className="auth-form__footer">
            <p>Уже есть аккаунт? <Link to="/login" className="auth-form__link">Войти</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
