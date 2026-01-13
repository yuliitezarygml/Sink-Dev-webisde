import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

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
  }, [title, photos]);

  // Получаем уникальные категории
  const categories = useMemo(() => {
    const cats = new Set(galleryData.photos.map(p => p.category).filter(Boolean));
    return ['Все', ...Array.from(cats)];
  }, [galleryData.photos]);

  // Фильтруем фото по выбранной категории
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'Все') return galleryData.photos;
    return galleryData.photos.filter(p => p.category === selectedCategory);
  }, [galleryData.photos, selectedCategory]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => 
      prev === null ? null : (prev + 1) % filteredPhotos.length
    );
  }, [selectedPhotoIndex, filteredPhotos.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => 
      prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  }, [selectedPhotoIndex, filteredPhotos.length]);

  const handleDownload = (e: React.MouseEvent, photo: GalleryPhoto) => {
    e.stopPropagation();
    fetch(photo.src)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `photo-${photo.id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(console.error);
  };

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handleNext, handlePrev]);

  const selectedPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <section className="gallery">
      <div className="gallery__container">
        <h2 className="gallery__title">{galleryData.title}</h2>
        
        {/* Фильтры категорий */}
        <div className="gallery__filters">
          {categories.map((cat) => (
            <button
              key={cat as string}
              className={`gallery__filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat as string);
                setSelectedPhotoIndex(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery__grid">
          {filteredPhotos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="gallery__item"
              onClick={() => setSelectedPhotoIndex(index)}
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
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div className="gallery__modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="gallery__close"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              ✕
            </button>
            
            <button className="gallery__nav gallery__nav--prev" onClick={handlePrev}>
              &#10094;
            </button>
            
            <div className="gallery__image-container">
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.alt}
                className="gallery__modal-image"
              />
              <button 
                className="gallery__download"
                onClick={(e) => handleDownload(e, selectedPhoto)}
                title="Скачать в высоком качестве"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Скачать оригинал
              </button>
            </div>

            <button className="gallery__nav gallery__nav--next" onClick={handleNext}>
              &#10095;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
