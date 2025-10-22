import React, { useState, useEffect } from "react";
import "../css/PhotoGallery.css";

// Импорт всех фотографий из папки images
import photo1 from "../images/bgfoto.jpg";
import photo2 from "../images/bgfoto copy.jpg";
import photo3 from "../images/bgfoto copy 4.jpg";
import photo4 from "../images/bgfoto copy 3.jpg";
import photo5 from "../images/bgfoto copy 2.jpg";
import photo6 from "../images/bgfoto copy 3.jpg";

// Массив всех фотографий с информацией об оригинальном размере
const photos = [
  { id: 1, src: photo1, alt: "Фотография 1", title: "Портрет", aspectRatio: 3/4 },
  { id: 2, src: photo2, alt: "Фотография 2", title: "Пейзаж", aspectRatio: 16/9 },
  { id: 3, src: photo3, alt: "Фотография 3", title: "Архитектура", aspectRatio: 16/9 },
  { id: 4, src: photo4, alt: "Фотография 4", title: "Макросъемка", aspectRatio: 4/6 },
  { id: 5, src: photo5, alt: "Фотография 5", title: "Уличная фотография", aspectRatio: 16/9 },
  { id: 6, src: photo6, alt: "Фотография 6", title: "Свадебная фотография", aspectRatio: 3/4 },
];

export const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ [key: number]: { width: number; height: number } }>({});

  useEffect(() => {
    // Загружаем реальные размеры изображений
    photos.forEach((photo) => {
      const img = new Image();
      img.onload = () => {
        setImageDimensions((prev) => ({
          ...prev,
          [photo.id]: { width: img.width, height: img.height },
        }));
      };
      img.src = photo.src;
    });
  }, []);

  const openModal = (photoId: number) => {
    setSelectedPhoto(photoId);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const downloadPhoto = (photoSrc: string, photoTitle: string) => {
    const link = document.createElement('a');
    link.href = photoSrc;
    link.download = `${photoTitle}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPhotoSpan = (photo: typeof photos[0]) => {
    const dimensions = imageDimensions[photo.id];
    if (!dimensions) return 1;
    
    const aspectRatio = dimensions.width / dimensions.height;
    
    // Горизонтальные фото (пейзаж) занимают 2 колонки
    if (aspectRatio > 1.3) return 2;
    // Вертикальные фото (портрет) занимают 1 колонку, но 2 ряда
    if (aspectRatio < 0.8) return 1;
    return 1;
  };

  const getPhotoRowSpan = (photo: typeof photos[0]) => {
    const dimensions = imageDimensions[photo.id];
    if (!dimensions) return 1;
    
    const aspectRatio = dimensions.width / dimensions.height;
    
    // Вертикальные фото занимают 2 ряда
    if (aspectRatio < 0.8) return 2;
    return 1;
  };

  return (
    <div className="photo-gallery">
      <div className="gallery-header">
        <h2 className="gallery-title">Галерея фотографий</h2>
        <p className="gallery-subtitle">Нажмите на фотографию для просмотра в полном размере</p>
      </div>
      
      <div className="gallery-grid">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="photo-item" 
            onClick={() => openModal(photo.id)}
            style={{
              gridColumn: `span ${getPhotoSpan(photo)}`,
              gridRow: `span ${getPhotoRowSpan(photo)}`,
            }}
          >
            <img 
              src={photo.src} 
              alt={photo.alt} 
              className="photo-thumbnail"
              loading="lazy"
            />
            <div className="photo-overlay">
              <h3 className="photo-title">{photo.title}</h3>
              <div className="photo-actions">
                <button 
                  className="view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(photo.id);
                  }}
                >
                   Просмотр
                </button>
                <button 
                  className="download-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadPhoto(photo.src, photo.title);
                  }}
                >
                   Скачать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно для просмотра фотографии */}
      {selectedPhoto && (
        <div className="photo-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <img 
              src={photos[selectedPhoto - 1].src} 
              alt={photos[selectedPhoto - 1].alt}
              className="modal-photo"
            />
            <div className="modal-info">
              <h3>{photos[selectedPhoto - 1].title}</h3>
              <button 
                className="modal-download-btn"
                onClick={() => downloadPhoto(photos[selectedPhoto - 1].src, photos[selectedPhoto - 1].title)}
              >
                ⬇️ Скачать фотографию
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
