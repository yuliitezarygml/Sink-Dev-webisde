import React, { useState, useEffect } from 'react';
import './FloatingAbout.css';

interface FloatingAboutProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  profileImage?: string;
  stats?: Array<{ label: string; value: string }>;
}

const FloatingAbout: React.FC<FloatingAboutProps> = ({
  isOpen = false,
  onClose,
  title = 'Обо мне',
  description = 'Профессиональный фотограф с многолетним опытом. Мы специализируемся на свадебной фотографии, портретах и событиях.',
  profileImage = '/photos/profile.jpg',
  stats = [
    { label: 'Лет опыта', value: '10+' },
    { label: 'Проектов', value: '500+' },
    { label: 'Довольных клиентов', value: '1000+' }
  ]
}) => {
  const [aboutData, setAboutData] = useState({
    title,
    description,
    profileImage,
    stats
  });

  useEffect(() => {
    if (isOpen) {
      fetch('/data/data.json')
        .then(response => response.json())
        .then(data => {
          if (data.about) {
            setAboutData(data.about);
          }
        })
        .catch(error => console.error('Ошибка загрузки About данных:', error));
    }
  }, [isOpen]);

  return (
    <>
      {/* Модальное окно */}
      {isOpen && (
        <div className="floating-about__overlay" onClick={onClose}>
          <div className="floating-about__modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="floating-about__close"
              onClick={onClose}
            >
              ✕
            </button>

            <div className="floating-about__content">
              {/* Фото профиля */}
              <div className="floating-about__image-wrapper">
                <img 
                  src={aboutData.profileImage}
                  alt="Фотограф"
                  className="floating-about__image"
                />
              </div>

              {/* Текст и информация */}
              <div className="floating-about__text">
                <h2 className="floating-about__title">{aboutData.title}</h2>
                
                <p className="floating-about__description">
                  {aboutData.description}
                </p>

                <div className="floating-about__stats">
                  {aboutData.stats.map((stat, index) => (
                    <div key={index} className="floating-about__stat">
                      <div className="floating-about__stat-value">{stat.value}</div>
                      <div className="floating-about__stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <a href="#contact" className="floating-about__button-link" onClick={onClose}>
                  Написать мне
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAbout;
