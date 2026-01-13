import React, { useState, useEffect } from 'react';
import './Hero.css';

interface HeroProps {
  date?: string;
  names?: {
    first: string;
    second: string;
  };
  photographer?: string;
  studio?: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  date,
  names,
  photographer,
  studio
}) => {
  const [heroData, setHeroData] = useState({
    date: date || '13.10.2025',
    names: names || { first: 'eveniment', second: 'usarb' },
    photographer: photographer || 'balti it',
    studio: studio || 'nortek',
    backgroundImage: '/photos/IMG_0225.jpg'
  });

  useEffect(() => {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => {
        if (data.hero) {
          setHeroData(data.hero);
        }
      })
  }, []);
  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__overlay"></div>
        <img 
          src={heroData.backgroundImage}
          alt="Background"
          className="hero__image"
        />
      </div>
      
      <div className="hero__content">
        <div className="hero__date">{heroData.date}</div>
        
        <h1 className="hero__title">
          <span>{heroData.names.first}</span>
          <span>{heroData.names.second}</span>
        </h1>
        
        <div className="hero__footer">
          <div className="hero__photographer">
            <p>Fotograf {heroData.photographer}</p>
            <p>|</p>
            <p>{heroData.studio}</p>
          </div>
          
          <div className="hero__scroll">
            <span>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
