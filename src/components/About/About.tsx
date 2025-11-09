import React from 'react';
import './About.css';

interface AboutProps {
  title?: string;
  description?: string;
  profileImage?: string;
  stats?: Array<{ label: string; value: string }>;
}

const About: React.FC<AboutProps> = ({
  title = 'Обо мне',
  description = 'Профессиональный фотограф с многолетним опытом. Мы специализируемся на свадебной фотографии, портретах и событиях.',
  profileImage = '/photos/profile.jpg',
  stats = [
    { label: 'Лет опыта', value: '10+' },
    { label: 'Проектов', value: '500+' },
    { label: 'Довольных клиентов', value: '1000+' }
  ]
}) => {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__grid">
          {/* Левая часть - фото */}
          <div className="about__image-wrapper">
            <img 
              src={profileImage}
              alt="Фотограф"
              className="about__image"
            />
          </div>

          {/* Правая часть - текст */}
          <div className="about__content">
            <h2 className="about__title">{title}</h2>
            
            <p className="about__description">
              {description}
            </p>

            <div className="about__stats">
              {stats.map((stat, index) => (
                <div key={index} className="about__stat">
                  <p className="about__stat-value">{stat.value}</p>
                  <p className="about__stat-label">{stat.label}</p>
                </div>
              ))}
            </div>

            <a href="#contact" className="about__button">
              Написать мне
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
