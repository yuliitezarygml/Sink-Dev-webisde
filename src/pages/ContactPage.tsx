import React, { useState, useEffect } from 'react';
import './ContactPage.css';

interface ContactData {
  title: string;
  subtitle: string;
  phone: string;
  social: Array<{ name: string; url: string }>;
  copyright: string;
}

const ContactPage: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData>({
    title: 'Свяжитесь со мной',
    subtitle: 'Давайте создадим что-то прекрасное вместе',
    phone: '+373 69 123 456',
    social: [
      { name: 'Instagram', url: '#' },
      { name: 'Facebook', url: '#' },
      { name: 'WhatsApp', url: '#' }
    ],
    copyright: '© 2025 Photography Portfolio. Все права защищены.'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => {
        if (data.contact) {
          setContactData(data.contact);
        }
      })
      .catch(error => console.error('Ошибка загрузки Contact данных:', error));
  }, []);

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
    <div className="contact-page">
      <div className="contact-page__container">
        <div className="contact-page__hero">
          <h1 className="contact-page__title">{contactData.title}</h1>
          <p className="contact-page__subtitle">{contactData.subtitle}</p>
        </div>

        <div className="contact-page__content">
          <div className="contact-page__info">
            <div className="contact-page__info-section">
              <h3 className="contact-page__info-title">Телефон</h3>
              <a href={`tel:${contactData.phone}`} className="contact-page__link">
                {contactData.phone}
              </a>
            </div>

            <div className="contact-page__info-section">
              <h3 className="contact-page__info-title">Социальные сети</h3>
              <div className="contact-page__social">
                {contactData.social.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-page__social-link"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="contact-page__form" onSubmit={handleSubmit}>
            <div className="contact-page__form-row">
              <div className="contact-page__form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-page__input"
                />
              </div>

              <div className="contact-page__form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Ваша почта"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-page__input"
                />
              </div>
            </div>

            <div className="contact-page__form-group">
              <input
                type="text"
                name="subject"
                placeholder="Тема"
                value={formData.subject}
                onChange={handleChange}
                required
                className="contact-page__input"
              />
            </div>

            <div className="contact-page__form-group">
              <textarea
                name="message"
                placeholder="Ваше сообщение"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="contact-page__textarea"
              />
            </div>

            <button
              type="submit"
              className={`contact-page__submit ${submitted ? 'contact-page__submit--sent' : ''}`}
            >
              {submitted ? '✓ Отправлено' : 'Отправить сообщение'}
            </button>
          </form>
        </div>

        <div className="contact-page__footer">
          <p className="contact-page__footer-text">
            {contactData.copyright}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;