import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';
import { Gallery as GalleryType } from './types/index';
import galleryApi from './services/galleryApi';

function App() {
  const [gallery, setGallery] = useState<GalleryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        const galleries = await galleryApi.getAllGalleries();

        if (galleries && galleries.length > 0) {
          setGallery(galleries[0]);
        } else {
          setShowError(true);
        }
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            showError ? (
              <NotFound />
            ) : loading ? (
              <div className="App">
                <div className="loader">
                  <div className="spinner"></div>
                  <p>Загрузка галереи...</p>
                </div>
              </div>
            ) : gallery ? (
              <div className="App">
                <Gallery
                  title={gallery.title}
                  photos={gallery.photos}
                  photographerName={gallery.photographerName || 'Фотограф'}
                  photographerEmail={gallery.photographerEmail || 'contact@ghiframe.studio'}
                  date={gallery.date || ''}
                  storageUntil={gallery.storageUntil || ''}
                />
              </div>
            ) : (
              <NotFound />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;