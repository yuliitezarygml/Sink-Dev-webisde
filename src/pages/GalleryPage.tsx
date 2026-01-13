import React from 'react';
import Hero from '../components/Hero/Hero';
import Gallery from '../components/Gallery/Gallery';
import './GalleryPage.css';

const GalleryPage: React.FC = () => {
  return (
    <div className="gallery-page">
      <Hero />
      <Gallery />
    </div>
  );
};

export default GalleryPage;