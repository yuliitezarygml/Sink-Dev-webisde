
import { Gallery, Photo } from '../types/index';

// Конфигурация API
const API_CONFIG = {
  // Измените на вашу URL Strapi сервера
  BASE_URL: process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337',
  // API endpoint для галереи
  GALLERIES_ENDPOINT: '/api/galleries',
  // API endpoint для фотографий
  PHOTOS_ENDPOINT: '/api/photos',
};

/**
 * Трансформация фото из Strapi формата в локальный формат
 */
const transformPhoto = (strapiPhoto: any): Photo => {
  const baseUrl = API_CONFIG.BASE_URL;
  
  // Получаем URL изображения
  const imageUrl = strapiPhoto.image?.url || '';
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;
  
  // Получаем thumbnail URL (используем small если thumbnail не доступен)
  const thumbnailUrl = strapiPhoto.image?.formats?.thumbnail?.url 
    || strapiPhoto.image?.formats?.small?.url
    || imageUrl;
  const fullThumbnailUrl = thumbnailUrl.startsWith('http') ? thumbnailUrl : `${baseUrl}${thumbnailUrl}`;

  return {
    ...strapiPhoto,
    fullUrl: fullImageUrl,
    thumbnailUrl: fullThumbnailUrl,
    date: new Date(strapiPhoto.publishedAt).toLocaleDateString('ru-RU'),
  };
};

/**
 * Трансформация галереи из Strapi формата в локальный формат
 */
const transformGallery = (strapiGallery: any): Gallery => {
  // Трансформируем каждое фото
  const photos = (strapiGallery.photos || []).map(transformPhoto);
  
  const publishedDate = new Date(strapiGallery.publishedAt).toLocaleDateString('ru-RU');
  
  return {
    ...strapiGallery,
    photos,
    date: publishedDate,
    photographerName: 'ghiframe.studio',
    photographerEmail: 'contact@ghiframe.studio',
    storageUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU'),
  };
};

/**
 * Получить все галереи
 */
export const getAllGalleries = async (): Promise<Gallery[]> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.GALLERIES_ENDPOINT}?populate[photos][populate]=image&populate=coverImage`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return (data.data || []).map(transformGallery);
  } catch (error) {
    console.error('Ошибка при загрузке галерей:', error);
    throw error;
  }
};

/**
 * Получить одну галерею по ID
 */
export const getGallery = async (galleryId: string): Promise<Gallery | null> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.GALLERIES_ENDPOINT}/${galleryId}?populate[photos][populate]=image&populate=coverImage`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data ? transformGallery(data.data) : null;
  } catch (error) {
    console.error(`Ошибка при загрузке галереи ${galleryId}:`, error);
    throw error;
  }
};

/**
 * Получить галерею по названию (slug)
 */
export const getGalleryBySlug = async (slug: string): Promise<Gallery | null> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.GALLERIES_ENDPOINT}?filters[slug][$eq]=${slug}&populate[photos][populate]=image&populate=coverImage`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data?.[0] ? transformGallery(data.data[0]) : null;
  } catch (error) {
    console.error(`Ошибка при загрузке галереи с slug ${slug}:`, error);
    throw error;
  }
};

/**
 * Получить фотографии галереи
 */
export const getGalleryPhotos = async (galleryId: string): Promise<Photo[]> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.PHOTOS_ENDPOINT}?filters[gallery][$eq]=${galleryId}&populate=image`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return (data.data || []).map(transformPhoto);
  } catch (error) {
    console.error(`Ошибка при загрузке фотографий галереи ${galleryId}:`, error);
    throw error;
  }
};

/**
 * Получить фотографию по ID
 */
export const getPhoto = async (photoId: string): Promise<Photo | null> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.PHOTOS_ENDPOINT}/${photoId}?populate=image`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data ? transformPhoto(data.data) : null;
  } catch (error) {
    console.error(`Ошибка при загрузке фотографии ${photoId}:`, error);
    throw error;
  }
};

/**
 * Получить фотографию с полным URL
 */
export const getPhotoUrl = (photoPath: string): string => {
  if (!photoPath) return '';
  
  // Если это уже полный URL
  if (photoPath.startsWith('http')) {
    return photoPath;
  }
  
  // Добавляем базовый URL Strapi
  return `${API_CONFIG.BASE_URL}${photoPath}`;
};

/**
 * Загрузить фотографию (для админ панели)
 */
export const uploadPhoto = async (file: File, galleryId: string) => {
  try {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('ref', 'api::photo.photo');
    formData.append('refId', galleryId);
    formData.append('field', 'image');

    const response = await fetch(
      `${API_CONFIG.BASE_URL}/api/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке фотографии:', error);
    throw error;
  }
};

/**
 * Создать галерею
 */
export const createGallery = async (galleryData: Partial<Gallery>) => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.GALLERIES_ENDPOINT}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: galleryData }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Ошибка при создании галереи:', error);
    throw error;
  }
};

/**
 * Обновить галерею
 */
export const updateGallery = async (galleryId: string, galleryData: Partial<Gallery>) => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.GALLERIES_ENDPOINT}/${galleryId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: galleryData }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Ошибка при обновлении галереи ${galleryId}:`, error);
    throw error;
  }
};

/**
 * Удалить галерею
 */
export const deleteGallery = async (galleryId: string) => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.GALLERIES_ENDPOINT}/${galleryId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error(`Ошибка при удалении галереи ${galleryId}:`, error);
    throw error;
  }
};

/**
 * Объект с методами API
 */
const galleryApi = {
  getAllGalleries,
  getGallery,
  getGalleryBySlug,
  getGalleryPhotos,
  getPhoto,
  getPhotoUrl,
  uploadPhoto,
  createGallery,
  updateGallery,
  deleteGallery,
};

export default galleryApi;
