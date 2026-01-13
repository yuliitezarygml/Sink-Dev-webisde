import React, { useState, useEffect } from 'react';
import './AboutPage.css';

interface AboutData {
  title: string;
  description: string;
  profileImage: string;
  stats: Array<{ label: string; value: string }>;
}

const AboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    title: ',Было весело работать с вами!',
    description: 'Загрузка...',
    profileImage: '',
    stats: []
  });

  useEffect(() => {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => {
        if (data.about) {
          setAboutData(data.about);
        }
      })
      .catch(error => console.error('Ошибка загрузки данных:', error));
  }, []);

  return (
    <div className="about-page">
      <div className="about-page__container">
        <div className="about-page__grid">
          <div className="about-page__image-column">
            <div className="about-page__image-wrapper">
              {aboutData.profileImage && (
                <img
                  src={aboutData.profileImage}
                  alt="Фотограф"
                  className="about-page__image"
                />
              )}
            </div>
          </div>

          <div className="about-page__content-column">
            <h1 className="about-page__title">{aboutData.title}</h1>
            <div className="about-page__divider"></div>
            
            <div className="about-page__description">
              <p>{aboutData.description}</p>
              <p>
                Фотография для меня — это не просто работа, а способ остановить время 
                и сохранить самые драгоценные моменты. Я стремлюсь к тому, чтобы каждый 
                кадр рассказывал уникальную историю.
              </p>
            </div>

            <div className="about-page__stats">
              {aboutData.stats.map((stat, index) => (
                <div key={index} className="about-page__stat">
                  <span className="about-page__stat-value">{stat.value}</span>
                  <span className="about-page__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="about-page__cta">
              <a href="https://sinkdev.dev/" className="about-page__button">
                Связаться со мной
              </a>
              <a href="/gallery" className="about-page__link">
                Смотреть портфолио
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
