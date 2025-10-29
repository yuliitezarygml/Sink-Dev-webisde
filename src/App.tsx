import React, { useEffect, useState } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import { Gallery as GalleryType } from './types/index';
import galleryApi from './services/galleryApi';

function App() {
  const [gallery, setGallery] = useState<GalleryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        // Сначала пробуем получить все галереи
        const galleries = await galleryApi.getAllGalleries();

        if (galleries && galleries.length > 0) {
          // Если есть переменная окружения с ID - берем ту галерею
          const galleryId = process.env.REACT_APP_GALLERY_ID;
          const selectedGallery = galleryId
            ? galleries.find((g: GalleryType) => String(g.id) === galleryId)
            : galleries[0];

          if (selectedGallery) {
            setGallery(selectedGallery);
          } else {
            setGallery(galleries[0]); // Берем первую если нет конкретной
          }
        } else {
          setError('Галереи не найдены на сервере');
        }
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        setError(`Ошибка подключения к серверу: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  if (loading) {
    return (
      <div className="App loading">
        <div className="loader">
          <div className="spinner"></div>
          <p>Загрузка галереи...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App loading">
        <div className="loader">
          <p style={{ color: '#ff6b6b', marginBottom: '20px' }}>⚠️ {error}</p>
          <p style={{ fontSize: '0.9em', opacity: 0.8 }}>
            Убедитесь, что Strapi сервер запущен на {process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {gallery && (
        <Gallery
          title={gallery.title}
          photos={gallery.photos}
          photographerName={gallery.photographerName || 'Фотограф'}
          date={gallery.date || ''}
          storageUntil={gallery.storageUntil || ''}
        />
      )}
    </div>
  );
}

export default App;
