import React, { useState, useEffect } from 'react';
import './Contact.css';

interface ContactData {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  social: Array<{ name: string; url: string }>;
  copyright: string;
}

interface ContactProps {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  social?: Array<{ name: string; url: string }>;
  copyright?: string;
}

const Contact: React.FC<ContactProps> = ({
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
    <section className="contact" id="contact">
      <div className="contact__container">
        <div className="contact__content">
          <h2 className="contact__title">{contactData.title}</h2>
          <p className="contact__subtitle">{contactData.subtitle}</p>

          <div className="contact__grid">
            {/* Контактная информация */}
            <div className="contact__info">
              <div className="contact__info-item">
                <h3 className="contact__info-title">Почта</h3>
                <a href={`mailto:${contactData.email}`} className="contact__link">
                  {contactData.email}
                </a>
              </div>

              <div className="contact__info-item">
                <h3 className="contact__info-title">Телефон</h3>
                <a href={`tel:${contactData.phone}`} className="contact__link">
                  {contactData.phone}
                </a>
              </div>

              <div className="contact__info-item">
                <h3 className="contact__info-title">Социальные сети</h3>
                <div className="contact__social">
                  {contactData.social.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__social-link"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Форма */}
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact__input"
                />
              </div>

              <div className="contact__form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Ваша почта"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact__input"
                />
              </div>

              <div className="contact__form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Тема"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="contact__input"
                />
              </div>

              <div className="contact__form-group">
                <textarea
                  name="message"
                  placeholder="Ваше сообщение"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="contact__textarea"
                />
              </div>

              <button 
                type="submit" 
                className={`contact__submit ${submitted ? 'contact__submit--sent' : ''}`}
              >
                {submitted ? '✓ Отправлено' : 'Отправить'}
              </button>
            </form>
          </div>
        </div>

        {/* Футер */}
        <div className="contact__footer">
          <p className="contact__footer-text">
            {contactData.copyright}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
