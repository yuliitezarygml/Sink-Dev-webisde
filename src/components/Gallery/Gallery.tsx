import React, { useState, useEffect } from 'react';
import './Gallery.css';

interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

interface GalleryData {
  title: string;
  photos: GalleryPhoto[];
}

interface GalleryProps {
  photos?: GalleryPhoto[];
  title?: string;
}

const Gallery: React.FC<GalleryProps> = ({
  title,
  photos
}) => {
  const [galleryData, setGalleryData] = useState<GalleryData>({
    title: 'Галерея',
    photos: []
  });
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Загружаем фото из JSON файла
  useEffect(() => {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => {
        setGalleryData({
          title: title || 'Галерея',
          photos: photos || data.photos
        });
      })
      .catch(error => console.error('Ошибка загрузки фото:', error));
  }, [title, photos]);

  return (
    <section className="gallery">
      <div className="gallery__container">
        <h2 className="gallery__title">{galleryData.title}</h2>
        
        <div className="gallery__grid">
          {galleryData.photos.map((photo) => (
            <div 
              key={photo.id} 
              className="gallery__item"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img 
                src={photo.src} 
                alt={photo.alt}
                className="gallery__image"
              />
              <div className="gallery__overlay">
                <p className="gallery__category">{photo.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для просмотра фото */}
      {selectedPhoto && (
        <div 
          className="gallery__modal"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="gallery__modal-content">
            <button 
              className="gallery__close"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.alt}
              className="gallery__modal-image"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
