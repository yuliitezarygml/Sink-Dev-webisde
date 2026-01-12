import React, { useState, useEffect } from 'react';
import './FloatingContact.css';

interface ContactData {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  social: Array<{ name: string; url: string }>;
  copyright: string;
}

interface FloatingContactProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  social?: Array<{ name: string; url: string }>;
  copyright?: string;
}

const FloatingContact: React.FC<FloatingContactProps> = ({
  isOpen = false,
  onClose,
  title,
  subtitle,
  email,
  phone,
  social,
  copyright
}) => {
  const [contactData, setContactData] = useState<ContactData>({
    title: title || 'Свяжитесь со мной',
    subtitle: subtitle || 'Давайте создадим что-то прекрасное вместе',
    email: email || 'info@example.com',
    phone: phone || '+373 69 123 456',
    social: social || [
      { name: 'Instagram', url: '#' },
      { name: 'Facebook', url: '#' },
      { name: 'WhatsApp', url: '#' }
    ],
    copyright: copyright || '© 2025 Photography Portfolio. Все права защищены.'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/data/data.json')
        .then(response => response.json())
        .then(data => {
          if (data.contact) {
            setContactData(data.contact);
          }
        })
        .catch(error => console.error('Ошибка загрузки Contact данных:', error));
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <>
      {/* Модальное окно */}
      {isOpen && (
        <div className="floating-contact__overlay" onClick={onClose}>
          <div className="floating-contact__modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="floating-contact__close"
              onClick={onClose}
            >
              ✕
            </button>

            <div className="floating-contact__content">
              <h2 className="floating-contact__title">{contactData.title}</h2>
              <p className="floating-contact__subtitle">{contactData.subtitle}</p>

              <div className="floating-contact__grid">
                {/* Контактная информация */}
                <div className="floating-contact__info">
                  {/*<div className="floating-contact__info-item">*/}
                  {/*  <h3 className="floating-contact__info-title">Почта</h3>*/}
                  {/*  <a href={`mailto:${contactData.email}`} className="floating-contact__link">*/}
                  {/*    {contactData.email}*/}
                  {/*  </a>*/}
                  {/*</div>*/}

                  <div className="floating-contact__info-item">
                    <h3 className="floating-contact__info-title">Телефон</h3>
                    <a href={`tel:${contactData.phone}`} className="floating-contact__link">
                      {contactData.phone}
                    </a>
                  </div>

                  <div className="floating-contact__info-item">
                    <h3 className="floating-contact__info-title">Социальные сети</h3>
                    <div className="floating-contact__social">
                      {contactData.social.map((link, index) => (
                        <a 
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="floating-contact__social-link"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Форма */}
                <form className="floating-contact__form" onSubmit={handleSubmit}>
                  <div className="floating-contact__form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="floating-contact__input"
                    />
                  </div>

                  <div className="floating-contact__form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Ваша почта"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="floating-contact__input"
                    />
                  </div>

                  <div className="floating-contact__form-group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Тема"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="floating-contact__input"
                    />
                  </div>

                  <div className="floating-contact__form-group">
                    <textarea
                      name="message"
                      placeholder="Ваше сообщение"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="floating-contact__textarea"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={`floating-contact__submit ${submitted ? 'floating-contact__submit--sent' : ''}`}
                  >
                    {submitted ? '✓ Отправлено' : 'Отправить'}
                  </button>
                </form>
              </div>

              <div className="floating-contact__footer">
                <p className="floating-contact__footer-text">
                  {contactData.copyright}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContact;
