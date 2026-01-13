import React from 'react';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <div className="landing">
      {/* Hero Section with Background Image */}
      <div className="landing__hero" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1699891730676-037bed3c1bed?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
        <div className="landing__overlay"></div>
        <div className="landing__container">
          <h1 className="landing__title">
            Sinkdev-Photo
          </h1>
          <p className="landing__subtitle">
            Искусство запечатлеть момент
          </p>
          <div className="landing__description">
            <p>
              Профессиональная фотосъемка свадеб и мероприятий. 
              Мы создаем историю вашей жизни в каждом кадре.
            </p>
          </div>
          <div className="landing__cta">
            <a href="/gallery" className="landing__button landing__button--primary">
              Смотреть портфолио
            </a>
            <a href="/contact" className="landing__button landing__button--secondary">
              Связаться
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="landing__features">
        <div className="landing__container">
          <h2 className="landing__section-title">Почему мы</h2>
          <div className="landing__features-grid">
            <div className="landing__feature">
              <div className="landing__feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
              <h3>Профессионализм</h3>
              <p>Топовое оборудование и многолетний опыт съемок</p>
            </div>
            <div className="landing__feature">
              <div className="landing__feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <h3>Скорость</h3>
              <p>Готовые фотографии уже через 7 дней после съемки</p>
            </div>
            <div className="landing__feature">
              <div className="landing__feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              </div>
              <h3>Авторский стиль</h3>
              <p>Уникальная обработка и внимание к деталям</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="landing__services">
        <div className="landing__container">
          <h2 className="landing__section-title">Услуги</h2>
          <div className="landing__services-grid">
            <div className="landing__service" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop)' }}>
              <div className="landing__service-overlay"></div>
              <div className="landing__service-content">
                <h3>Свадьбы</h3>
                <p>Полное сопровождение вашего особенного дня</p>
              </div>
            </div>
            <div className="landing__service" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop)' }}>
              <div className="landing__service-overlay"></div>
              <div className="landing__service-content">
                <h3>Мероприятия</h3>
                <p>Репортажная съемка корпоративов и праздников</p>
              </div>
            </div>
            <div className="landing__service" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop)' }}>
              <div className="landing__service-overlay"></div>
              <div className="landing__service-content">
                <h3> ты</h3>
                <p>Индивидуальные фотосессии в студии и на улице</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="landing__portfolio">
        <div className="landing__container">
          <h2 className="landing__section-title">Избранные работы</h2>
          <div className="landing__portfolio-grid">
           
            <div className="landing__portfolio-item">
              <img src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop" alt="Пейзаж" />
            </div>
            <div className="landing__portfolio-item">
              <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop" alt="Модель" />
            </div>
             <div className="landing__portfolio-item">
              <img src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop" alt="Пейзаж" />
            </div>
            <div className="landing__portfolio-item">
              <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop" alt="Модель" />
            </div>
            
          </div>
          <div className="landing__portfolio-more">
            <a href="/gallery" className="landing__button landing__button--secondary">
              Смотреть всё портфолио
            </a>
          </div>
        </div>
      </div>

      {/* Contact Preview Section */}
      <div className="landing__contact-preview">
        <div className="landing__container">
          <div className="landing__contact-content">
            <div className="landing__contact-text">
              <h2>Давайте творить вместе</h2>
              <p>Забронируйте дату или задайте любые вопросы</p>
            </div>
            <div className="landing__contact-actions">
              <a href="/contact" className="landing__button landing__button--primary">
                Написать нам
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
