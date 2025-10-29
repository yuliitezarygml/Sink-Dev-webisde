import React, { useState } from 'react';
import { Photo } from '../types/index';
import PhotoCard from './PhotoCard';
import ImageViewerModal from './ImageViewerModal';
import '../styles/Gallery.css';

interface GalleryProps {
  title: string;
  photos: Photo[];
  photographerName: string;
  date: string;
  storageUntil: string;
}

const Gallery: React.FC<GalleryProps> = ({
  title,
  photos,
  photographerName,
  date,
  storageUntil,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentIndex(photos.findIndex(p => p.id === photo.id));
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      const nextPhoto = photos[currentIndex + 1];
      setSelectedPhoto(nextPhoto);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevPhoto = photos[currentIndex - 1];
      setSelectedPhoto(prevPhoto);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  const scrollToGallery = () => {
    const gallerySection = document.querySelector('.gallery-header');
    gallerySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="gallery-container">
      {/* Hero Section */}
      <div 
        className="gallery-hero" 
        style={{ backgroundImage: `url(${photos[0]?.fullUrl})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-date">{date}</p>
          <h1 className="hero-title">{title}</h1>
          <div className="hero-info">
            <p>Фотограф {photographerName} | ghiframe.studio</p>
          </div>
          <button 
            className="hero-scroll-btn"
            onClick={scrollToGallery}
          >
            ↓
          </button>
        </div>
      </div>

      {/* Gallery View */}
      <div className="gallery-view">
        <div className="gallery-header">
          <div className="gallery-header-content">
            <h1 className="gallery-title">{title}</h1>
            <div className="gallery-info">
              <p className="gallery-photographer">
                📷 Фотограф: <strong>{photographerName}</strong>
              </p>
              <p className="gallery-date">
                📅 Дата: <strong>{date}</strong>
              </p>
              <p className="gallery-storage">
                💾 Хранится до: <strong>{storageUntil}</strong>
              </p>
            </div>
            <button className="download-btn">
              ⬇️ Скачать файлы
            </button>
          </div>
        </div>

        <div className="gallery-grid">
          {photos.map(photo => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClick={handlePhotoClick}
            />
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <ImageViewerModal
          photo={selectedPhoto}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={currentIndex < photos.length - 1}
          hasPrev={currentIndex > 0}
          currentIndex={currentIndex}
          totalPhotos={photos.length}
        />
      )}
    </div>
  );
};

export default Gallery;
