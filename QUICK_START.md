# ⚡ Быстрый старт с Strapi

Этот файл содержит шаги для быстрой настройки Strapi и React приложения.

## 1️⃣ Создание Strapi проекта

```bash
# В отдельной папке создайте новый Strapi проект
npx create-strapi-app gallery-cms

# Или если у вас уже есть Strapi
cd your-strapi-project
```

## 2️⃣ Копирование конфигурации

```bash
# В папке React приложения
cp .env.example .env.local
```

## 3️⃣ Запуск Strapi

```bash
cd gallery-cms
npm run develop
```

Откроется на http://localhost:1337/admin

## 4️⃣ Создание коллекций в Strapi

### Gallery (Галерея)

1. **Content Manager** → **Create new collection type**
2. Название: `gallery`
3. Поля:
   - `title` (String, Required)
   - `slug` (UID, Required)
   - `photographerName` (String)
   - `photographerEmail` (Email)
   - `description` (Rich Text)
   - `date` (Date)
   - `storageUntil` (Date)
   - `photos` (One-to-Many, relation с Photo)

### Photo (Фотография)

1. **Content Manager** → **Create new collection type**
2. Название: `photo`
3. Поля:
   - `title` (String, Required)
   - `image` (Media, Required)
   - `date` (Date)
   - `gallery` (Many-to-One, relation с Gallery)

## 5️⃣ Установка прав доступа

1. Идите в **Settings → Users & Permissions Plugin → Roles → Public**
2. Разрешьте:
   - ✅ `find` (galleries)
   - ✅ `findOne` (galleries)
   - ✅ `find` (photos)
   - ✅ `findOne` (photos)

## 6️⃣ Добавление данных

1. В Strapi админ панели перейдите в **Content Manager**
2. Создайте новую галерею в `galleries`
3. Загрузите фотографии
4. Создайте фотографии в `photos` и свяжите с галереей

## 7️⃣ Запуск React приложения

```bash
# В другом терминале
npm start
```

Откроется на http://localhost:3000

---

## ✅ Проверка

Должны увидеть:
- ✅ Hero страница с первой фотографией
- ✅ Кнопка "↓" для прокрутки
- ✅ Сетка фотографий ниже
- ✅ Клик на фото → полноэкранный просмотр

---

## 🔧 Если не работает

### 1. CORS ошибка

Редактируйте `config/middlewares.js` в Strapi:

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http://localhost:3000'],
        },
      },
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 2. Проверить API

```bash
curl http://localhost:1337/api/galleries
```

Должен вернуть JSON с данными

### 3. Проверить логи

Откройте F12 → Console в браузере для ошибок JavaScript

---

## 📱 Тестирование

### На локальной машине
- React: http://localhost:3000
- Strapi: http://localhost:1337

### На другом устройстве
1. Найдите IP вашего компьютера: `ipconfig` (Windows) или `ifconfig` (Mac/Linux)
2. Откройте: `http://<YOUR_IP>:3000`

---

## 🚀 Production

```bash
# React
npm run build
# Загрузить папку build на Vercel или Netlify

# Strapi
# Развернуть на Railway, Render или другом хосте
```

---

**Готово!** 🎉 Теперь у вас есть полнофункциональная фотогалерея на Strapi!
