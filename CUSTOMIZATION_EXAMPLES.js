// ============================================
// ПРИМЕРЫ КАСТОМИЗАЦИИ КОМПОНЕНТОВ
// ============================================

/*
 * ЭТО ПРИМЕРЫ КОДА - используйте их как шпаргалку
 * Вставляйте эти значения в App.tsx в компоненты
 */

// ============================================
// 1. HERO - Главный экран
// ============================================

/* ПРИМЕР 1: Русская пара */
{
  date="15.08.2025"
  names={{ first: 'Иван', second: 'и Мария' }}
  photographer="Петр Сидоров"
  studio="sidorov.photo"
  studioLink="https://sidorov.photo"
}

/* ПРИМЕР 2: Европейская пара */
{
  date="20.09.2025"
  names={{ first: 'Marco', second: 'and Elena' }}
  photographer="Luigi Rossi"
  studio="rossi.photography"
  studioLink="https://rossi.photography"
}

// ============================================
// 2. GALLERY - Галерея фото
// ============================================

/* Как добавить новое фото: */

const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
    alt: 'Невеста на красивом фоне',
    category: 'Портреты'
  },
  {
    id: 2,
    src: 'https://your-domain.com/photo-2.jpg', // ваша ссылка на фото
    alt: 'Кольца на книге',
    category: 'Детали'
  },
  // Просто добавьте ещё элементы в массив
];

/* СОВЕТ: Где найти красивые фото */
// - Unsplash: https://unsplash.com
// - Pexels: https://pexels.com
// - Или загрузите свои на свой сервер и вставьте ссылку

// ============================================
// 3. ABOUT - О фотографе
// ============================================

/* ПРИМЕР 1: Опытный фотограф */
{
  title="Обо мне"
  description="Я профессиональный фотограф с более чем 15 годами опыта. Специализируюсь на свадебной и портретной фотографии. Каждый момент для меня — это история, которую нужно сохранить."
  stats={[
    { label: 'Свадеб', value: '+600' },
    { label: 'Довольных клиентов', value: '100%' },
    { label: 'Лет опыта', value: '15+' },
    { label: 'Наград', value: '25' }
  ]}
}

/* ПРИМЕР 2: Молодой фотограф */
{
  title="Привет! Это я"
  description="Начинающий фотограф с огромной страстью к своему делу. Создаю естественные и красивые фотографии. Каждая работа — это мой личный проект."
  stats={[
    { label: 'Проектов', value: '+50' },
    { label: 'Довольных клиентов', value: '100%' },
    { label: 'Месяцев опыта', value: '18' },
    { label: 'Благодарностей', value: '50+' }
  ]}
}

// ============================================
// 4. CONTACT - Форма контакта
// ============================================

/* ПРИМЕР 1: Фотограф в России */
{
  title="Давайте создадим красоту"
  subtitle="Напишите мне и расскажите о вашем событии"
  email="info@myphoto.ru"
  phone="+7 (925) 123-45-67"
  social={[
    { name: 'Instagram', url: 'https://instagram.com/myphoto' },
    { name: 'WhatsApp', url: 'https://wa.me/79251234567' },
    { name: 'Телеграм', url: 'https://t.me/myphoto' }
  ]}
}

/* ПРИМЕР 2: Фотограф в Европе */
{
  title="Contactează-mă"
  subtitle="Haideti să creăm ceva frumos împreună"
  email="contact@photography.md"
  phone="+373 69 123 456"
  social={[
    { name: 'Instagram', url: 'https://instagram.com/photography' },
    { name: 'Facebook', url: 'https://facebook.com/photography' },
    { name: 'Pinterest', url: 'https://pinterest.com/photography' }
  ]}
}

// ============================================
// ПОЛНЫЙ ПРИМЕР ДЛЯ App.tsx
// ============================================

import React from 'react';
import Hero from './components/Hero/Hero';
import Gallery from './components/Gallery/Gallery';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className="App">
      <Hero 
        date="13.10.2025"
        names={{ first: 'Trofim', second: 'și Daniela' }}
        photographer="Ion Ghiletchi"
        studio="ghiframe.studio"
        studioLink="https://ghiframe.studio"
      />
      
      <Gallery 
        title="Мои лучшие работы"
        // photos добавьте свои, если нужно
      />
      
      <About 
        title="Обо мне"
        description="Профессиональный фотограф с опытом..."
      />
      
      <Contact 
        title="Свяжитесь со мной"
        email="your@email.com"
        phone="+373 69 123 456"
      />
    </div>
  );
}

export default App;

// ============================================
// ИЗМЕНЕНИЕ ЦВЕТОВ
// ============================================

/* Если вы хотите изменить тёмный стиль на другой: */

// В каждом файле CSS замените:
// background-color: #0a0a0a;  /* очень тёмный */
// background-color: #1a1a1a;  /* чуть светлее */
// color: white;                /* белый текст */

// На свои цвета, например:
// background-color: #1a1a2e;  /* глубокий синий */
// background-color: #16213e;  /* ещё темнее синий */
// color: #eaeaea;              /* мягко-белый */

// ============================================
// ПОЛЕЗНЫЕ ССЫЛКИ
// ============================================

// Иконки: https://fontawesome.com
// Фото: https://unsplash.com, https://pexels.com
// Цвета: https://coolors.co
// Шрифты: https://fonts.google.com
// Анимации: https://animate.style
