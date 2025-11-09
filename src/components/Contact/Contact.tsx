import React, { useState, useEffect } from 'react';
import './Contact.css';
import emailjs from 'emailjs-com';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailConfig, setEmailConfig] = useState({
    publicKey: '',
    serviceId: '',
    templateId: '',
    enabled: false
  });

  useEffect(() => {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => {
        if (data.contact) {
          setContactData(data.contact);
        }
        if (data.emailjs) {
          setEmailConfig(data.emailjs);
          // Инициализация EmailJS с данными из JSON
          if (data.emailjs.publicKey && data.emailjs.publicKey !== 'YOUR_PUBLIC_KEY') {
            emailjs.init(data.emailjs.publicKey);
          }
        }
      })
      .catch(error => console.error('Ошибка загрузки данных:', error));
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
    
    // Проверка, включена ли отправка email
    if (!emailConfig.enabled || !emailConfig.serviceId || !emailConfig.templateId) {
      setError('Сервис отправки писем временно недоступен. Пожалуйста, попробуйте позже.');
      return;
    }

    setLoading(true);
    setError('');

    // Параметры для отправки
    const templateParams = {
      to_email: contactData.email,
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email
    };

    emailjs
      .send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams
      )
      .then((response) => {
        console.log('Email успешно отправлен!', response.status, response.text);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
        
        // Скрыть сообщение через 3 секунды
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      })
      .catch((err) => {
        console.error('Ошибка при отправке:', err);
        setError('Ошибка при отправке письма. Пожалуйста, попробуйте снова.');
        setLoading(false);
      });
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
                disabled={loading}
                className={`contact__submit ${submitted ? 'contact__submit--sent' : ''} ${loading ? 'contact__submit--loading' : ''}`}
              >
                {loading ? '⏳ Отправка...' : submitted ? '✓ Отправлено' : 'Отправить'}
              </button>
              {error && <p className="contact__error">{error}</p>}
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
