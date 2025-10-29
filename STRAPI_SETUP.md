# 🎬 Strapi Integration для Photo Gallery

Этот документ описывает, как настроить интеграцию с **Strapi CMS** для загрузки фотографий из API вместо локального JSON.

## 🚀 Быстрый старт

### 1. Установка Strapi

```bash
# Создайте новый Strapi проект
npx create-strapi-app my-gallery-cms

# Или если у вас уже есть Strapi
cd your-strapi-project
```

### 2. Конфигурация окружения

Скопируйте `.env.example` в `.env.local`:

```bash
cp .env.example .env.local
```

Отредактируйте `.env.local`:

```env
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_GALLERY_ID=1
```

### 3. Структура Strapi коллекций

В панели Strapi создайте две коллекции:

#### **Gallery** (Галерея)

Поля:
- `title` (Text) - Название галереи
- `slug` (UID) - URL-friendly название
- `photographerName` (Text) - Имя фотографа
- `photographerEmail` (Email) - Email фотографа
- `description` (Rich Text) - Описание
- `date` (Date) - Дата события
- `storageUntil` (Date) - Дата удаления
- `photos` (One-to-Many) - Связь с фотографиями

#### **Photo** (Фотография)

Поля:
- `title` (Text) - Название фотографии
- `image` (Media) - Изображение
- `thumbnailUrl` (Text) - URL миниатюры (опционально)
- `date` (Date) - Дата фотографии
- `gallery` (Many-to-One) - Ссылка на галерею

### 4. Использование API

#### Основной API файл: `src/services/galleryApi.ts`

**Все методы:**

```typescript
// Получить все галереи
const galleries = await galleryApi.getAllGalleries();

// Получить одну галерею по ID
const gallery = await galleryApi.getGallery('1');

// Получить галерею по slug
const gallery = await galleryApi.getGalleryBySlug('trofim-i-daniela');

// Получить фотографии галереи
const photos = await galleryApi.getGalleryPhotos('1');

// Получить одну фотографию
const photo = await galleryApi.getPhoto('5');

// Получить полный URL фотографии
const url = galleryApi.getPhotoUrl('/uploads/photo.jpg');

// Создать галерею
const newGallery = await galleryApi.createGallery({
  title: 'Новая галерея',
  photographerName: 'Иван Иванов',
  date: '2025-10-13',
  storageUntil: '2026-10-13'
});

// Обновить галерею
const updated = await galleryApi.updateGallery('1', {
  title: 'Обновленное название'
});

// Удалить галерею
await galleryApi.deleteGallery('1');
```

### 5. Запуск проекта

**Terminal 1 - Strapi:**
```bash
cd your-strapi-project
npm run develop
# Откроется на http://localhost:1337/admin
```

**Terminal 2 - React приложение:**
```bash
cd Sink-Dev-webisde
npm start
# Откроется на http://localhost:3000
```

---

## 📋 JSON Структура Strapi ответа

### Галерея:
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Trofim și Daniela",
      "slug": "trofim-i-daniela",
      "photographerName": "Ion Ghilețchi",
      "photographerEmail": "ion@ghiframe.studio",
      "description": "Свадебная фотосессия",
      "date": "2025-10-13",
      "storageUntil": "2026-10-13",
      "photos": {
        "data": [...]
      }
    }
  }
}
```

### Фотография:
```json
{
  "id": 1,
  "attributes": {
    "title": "Невеста у окна",
    "date": "2025-10-13",
    "image": {
      "data": {
        "id": 1,
        "attributes": {
          "url": "/uploads/photo.jpg",
          "width": 1920,
          "height": 1080
        }
      }
    },
    "gallery": {
      "data": {
        "id": 1
      }
    }
  }
}
```

---

## 🔐 Безопасность

### Публичный доступ

По умолчанию Strapi запрещает публичный доступ. Чтобы разрешить:

1. Откройте **Settings → Roles → Public**
2. Разрешьте:
   - `find` для `galleries`
   - `findOne` для `galleries`
   - `find` для `photos`
   - `findOne` для `photos`

### JWT токен (для админ запросов)

```typescript
// Добавьте токен в .env
REACT_APP_STRAPI_API_TOKEN=your_jwt_token

// Используйте в запросах
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`
  }
});
```

---

## 🐛 Отладка

### Проверить доступность Strapi:

```bash
curl http://localhost:1337/api/galleries
```

### Проверить логи React:

Откройте DevTools (F12) → Console для ошибок API

### Типичные проблемы:

| Проблема | Решение |
|----------|---------|
| CORS ошибка | Настройте CORS в `config/middlewares.js` Strapi |
| 401 Unauthorized | Проверьте JWT токен и права доступа |
| 404 Not Found | Проверьте ID галереи и наличие данных в Strapi |
| Нет изображений | Убедитесь, что медиафайлы загружены в Strapi |

---

## 🎨 Примеры использования

### Получить галерею и отобразить:

```typescript
import galleryApi from './services/galleryApi';

const [gallery, setGallery] = useState(null);

useEffect(() => {
  const loadGallery = async () => {
    try {
      const data = await galleryApi.getGalleryBySlug('trofim-i-daniela');
      setGallery(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };
  
  loadGallery();
}, []);
```

### Загрузить фотографию:

```typescript
const handlePhotoUpload = async (file: File) => {
  try {
    const result = await galleryApi.uploadPhoto(file, '1');
    console.log('Загружено:', result);
  } catch (error) {
    console.error('Ошибка загрузки фото:', error);
  }
};
```

---

## 📦 Production развертывание

### Strapi хостинг:
- **Railway** - https://railway.app
- **Heroku** - https://www.heroku.com
- **Render** - https://render.com
- **PlanetScale** - для БД
- **AWS** - EC2 + RDS

### React хостинг:
- **Vercel** - `vercel deploy`
- **Netlify** - `netlify deploy`
- **GitHub Pages** - `npm run build`

---

## 📚 Полезные ссылки

- [Strapi Документация](https://docs.strapi.io)
- [Strapi REST API](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html)
- [Strapi GraphQL](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/graphql-api.html)
- [React fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

**Готово!** 🎉 Теперь ваша галерея загружает фотографии из Strapi API.
