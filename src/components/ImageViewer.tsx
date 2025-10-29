import React from 'react';
import { Photo } from '../types/index';
import '../styles/ImageViewer.css';

interface ImageViewerProps {
  photo: Photo;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  currentIndex: number;
  totalPhotos: number;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  currentIndex,
  totalPhotos,
}) => {
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') hasNext && onNext();
      if (e.key === 'ArrowLeft') hasPrev && onPrev();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasNext, hasPrev, onClose, onNext, onPrev]);

  return (
    <div className="image-viewer-modal" onClick={onClose}>
      <div className="image-viewer-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Image Container */}
        <div className="image-container">
          <img 
            src={photo.fullUrl} 
            alt={photo.title}
            className="full-image"
          />
        </div>

        {/* Navigation */}
        <div className="image-viewer-nav">
          <button 
            className="nav-btn prev-btn"
            onClick={onPrev}
            disabled={!hasPrev}
            title="Предыдущая фото (Стрелка влево)"
          >
            ◀ Назад
          </button>

          <div className="image-counter">
            {currentIndex + 1} / {totalPhotos}
          </div>

          <button 
            className="nav-btn next-btn"
            onClick={onNext}
            disabled={!hasNext}
            title="Следующая фото (Стрелка вправо)"
          >
            Далее ▶
          </button>
        </div>

        {/* Photo Info */}
        <div className="image-info">
          <h2>{photo.title}</h2>
          <p>{photo.date}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
