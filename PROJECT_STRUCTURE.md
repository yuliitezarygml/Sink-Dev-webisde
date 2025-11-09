# 📂 ПОЛНАЯ СТРУКТУРА ПРОЕКТА

```
sink-dev-webisde/
│
├── 📄 package.json                    ← Конфиг проекта
├── 📄 tsconfig.json                   ← Конфиг TypeScript
├── 📄 .gitignore                      ← Файлы для Git
│
├── 📖 README.md                       ← Главное описание (старый шаблон)
├── 📖 README_NEW.md                   ← Новое описание проекта
├── 📖 QUICK_START.md                  ⭐ ШПАРГАЛКА ДЛЯ НОВИЧКОВ
├── 📖 GUIDE.md                        ← Полное руководство
├── 📖 FOR_BEGINNERS.md                ← Как всё работает
├── 📄 PROJECT_SUMMARY.md              ← Что было создано
├── 📄 CUSTOMIZATION_EXAMPLES.js       ← Примеры кода
│
├── 📁 public/                         ← Статические файлы
│   ├── index.html                     ← Главный HTML файл
│   ├── manifest.json
│   └── robots.txt
│
├── 📁 src/                            ← Исходный код
│   │
│   ├── 📄 index.tsx                   ← Точка входа (загружает App)
│   ├── 📄 index.css                   ← Глобальные CSS переменные
│   │
│   ├── 📄 App.tsx                     ← Главный компонент
│   ├── 📄 App.css                     ← Глобальные стили
│   │
│   ├── 📁 components/                 ← ВСЕ КОМПОНЕНТЫ САЙТА
│   │   │
│   │   ├── 📁 Hero/                   ← КОМПОНЕНТ 1: Главный экран
│   │   │   ├── Hero.tsx               ← Логика (React код)
│   │   │   └── Hero.css               ← Стили (CSS)
│   │   │
│   │   ├── 📁 Gallery/                ← КОМПОНЕНТ 2: Галерея фото
│   │   │   ├── Gallery.tsx            ← Логика (React код)
│   │   │   └── Gallery.css            ← Стили (CSS)
│   │   │
│   │   ├── 📁 About/                  ← КОМПОНЕНТ 3: О фотографе
│   │   │   ├── About.tsx              ← Логика (React код)
│   │   │   └── About.css              ← Стили (CSS)
│   │   │
│   │   ├── 📁 Contact/                ← КОМПОНЕНТ 4: Форма контакта
│   │   │   ├── Contact.tsx            ← Логика (React код)
│   │   │   └── Contact.css            ← Стили (CSS)
│   │   │
│   │   └── 📁 PhotoGallery/           ← Старый компонент (не используется)
│   │
│   ├── 📄 react-app-env.d.ts          ← TypeScript декларации
│   ├── 📄 reportWebVitals.ts          ← Метрики производительности
│   └── 📄 setupTests.ts               ← Конфиг тестов
│
├── 📁 node_modules/                   ← Установленные пакеты (НЕ ТРОГАЙТЕ!)
├── 📄 package-lock.json               ← Блокировка версий пакетов
│
└── 📁 .git/                           ← История Git (НЕ ТРОГАЙТЕ!)
```

---

## 🎯 ОСНОВНЫЕ ПАПКИ И ФАЙЛЫ

### **public/** - Статические файлы
```
public/
├── index.html          ← Главная страница браузера
├── manifest.json       ← Информация для PWA
└── robots.txt          ← Правила для поисковиков
```

### **src/** - Исходный код React
```
src/
├── index.tsx           ← ТОЧКА ВХОДА (загружает App.tsx)
├── App.tsx             ← ГЛАВНЫЙ КОМПОНЕНТ (содержит все компоненты)
└── components/         ← ВСЕ КОМПОНЕНТЫ САЙТА
    ├── Hero/           ← Главный экран
    ├── Gallery/        ← Галерея фото
    ├── About/          ← О фотографе
    └── Contact/        ← Форма контакта
```

---

## 🔄 КАК БРАУЗЕР ЗАГРУЖАЕТ САЙТ

```
1. Браузер открывает public/index.html
2. index.html загружает React (из node_modules)
3. React выполняет src/index.tsx
4. index.tsx загружает App.tsx в элемент <div id="root">
5. App.tsx показывает:
   - <Hero />
   - <Gallery />
   - <About />
   - <Contact />
6. Каждый компонент:
   - Загружает свой .tsx файл
   - Применяет свой .css файл
   - Отображается на странице
```

---

## 📝 НАЗНАЧЕНИЕ КАЖДОГО ФАЙЛА

| Файл | Тип | Назначение |
|------|-----|-----------|
| index.tsx | JavaScript | Загружает React приложение |
| App.tsx | JavaScript | Главный компонент, содержит все остальные |
| App.css | CSS | Глобальные стили для всего сайта |
| components/ | Папка | Все компоненты сайта |
| Hero.tsx | JavaScript | Логика компонента Hero |
| Hero.css | CSS | Стили компонента Hero |
| Gallery.tsx | JavaScript | Логика компонента Gallery |
| Gallery.css | CSS | Стили компонента Gallery |
| package.json | JSON | Конфиг: какие пакеты использовать |
| tsconfig.json | JSON | Конфиг: правила TypeScript |
| public/index.html | HTML | Главная страница браузера |

---

## ✅ ВАЖНЫЕ ПРАВИЛА

### МОЖНО менять:
- ✅ Содержимое `.tsx` файлов (логика)
- ✅ Содержимое `.css` файлов (стили)
- ✅ Значения в `package.json` (но аккуратно)
- ✅ Документацию файлы (`.md`)

### НЕЛЬЗЯ трогать:
- ❌ Папку `node_modules/`
- ❌ Папку `.git/`
- ❌ Структуру папок компонентов
- ❌ Имена файлов компонентов

### ОСТОРОЖНО:
- ⚠️ `tsconfig.json` - конфиг TypeScript
- ⚠️ `package.json` - конфиг зависимостей
- ⚠️ Удаление импортов из файлов

---

## 🚀 БЫСТРАЯ НАВИГАЦИЯ

### Нужно изменить текст на сайте?
→ Откройте `src/App.tsx` и меняйте значения в компонентах

### Нужно изменить стили (цвета, размеры)?
→ Откройте нужный файл `src/components/*/ComponentName.css`

### Нужно добавить новое фото?
→ Откройте `src/components/Gallery/Gallery.tsx` и добавьте URL

### Нужно изменить контакты?
→ Откройте `src/components/Contact/Contact.tsx` и меняйте параметры

### Нужно запустить сайт?
→ Откройте терминал и напишите `npm start`

### Нужно собрать для продакшена?
→ Откройте терминал и напишите `npm build`

---

## 📊 СВЯЗИ МЕЖДУ ФАЙЛАМИ

```
index.html (браузер)
    ↓
    содержит: <div id="root"></div>
    ↓
index.tsx (React)
    ↓
    рендерит: <App />
    ↓
App.tsx (главный компонент)
    ├─ рендерит: <Hero />
    │   ├─ Hero.tsx (логика)
    │   └─ Hero.css (стили)
    │
    ├─ рендерит: <Gallery />
    │   ├─ Gallery.tsx (логика)
    │   └─ Gallery.css (стили)
    │
    ├─ рендерит: <About />
    │   ├─ About.tsx (логика)
    │   └─ About.css (стили)
    │
    └─ рендерит: <Contact />
        ├─ Contact.tsx (логика)
        └─ Contact.css (стили)
```

---

## 💾 РАЗМЕРЫ ПАПОК

| Папка | Размер | Назначение |
|-------|--------|-----------|
| node_modules/ | ~500 MB | Все пакеты (большая!) |
| .git/ | ~5 MB | История Git |
| public/ | < 1 MB | Статические файлы |
| src/ | < 1 MB | Исходный код |

**Примечание:** `node_modules/` очень большая! Не коммитьте её в Git.

---

## 🔧 КОНФИГ ФАЙЛЫ

### package.json
```json
{
  "name": "sink-dev-webisde",
  "version": "0.1.0",
  "dependencies": { ... },    // Пакеты
  "scripts": { ... }          // Команды (npm start, npm build)
}
```

### tsconfig.json
```json
{
  "compilerOptions": { ... }  // Правила TypeScript
}
```

### .gitignore
```
node_modules/     // Не коммитим
.env              // Не коммитим секреты
build/            // Не коммитим собранный код
```

---

**Теперь вы знаете, где всё находится! 🎉**

Начните с изучения файлов:
1. `QUICK_START.md` - быстрый старт
2. `GUIDE.md` - полное руководство
3. `FOR_BEGINNERS.md` - как всё работает

Удачи! 🚀
