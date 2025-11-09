import React, { useState } from 'react';
import Hero from './components/Hero/Hero';
import Gallery from './components/Gallery/Gallery';
import FloatingAbout from './components/FloatingAbout/FloatingAbout';
import FloatingContact from './components/FloatingContact/FloatingContact';
import FloatingMenu from './components/FloatingMenu/FloatingMenu';

function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="App">
      <Hero />
      <Gallery />
      
      {/* Модальные окна */}
      <FloatingAbout isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <FloatingContact isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      
      {/* Плавающее меню */}
      <FloatingMenu 
        onAboutClick={() => setAboutOpen(true)}
        onContactClick={() => setContactOpen(true)}
      />
    </div>
  );
}

export default App;
