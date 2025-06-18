import React, { useState, useEffect } from 'react';
import axios from "axios";
import {fetchData} from "../utils/api";
import './modalForm.scss';
const ModalForm = ({handleCloseModal}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        text: '',
        consent: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        axios.defaults.withCredentials = true;


        const url = "http://127.0.0.1:8000/api/get-csrf-token/";
        const headers = {
            'X-Get-Token-Csrf-For-React': 'Hkjh98hjk8khj77slkhj'
        };

        fetchData(url, headers, setToken);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Очищаем ошибку при изменении поля
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'first_name':
            case 'last_name':
                if (!/^[А-Яа-яёЁ-]{2,50}$/.test(value)) {
                    return 'Должно быть 2-50 символов кириллицы или дефис';
                }
                break;
            case 'phone':
                if (!/^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(value)) {
                    return 'Формат: +7/8 XXX XXX-XX-XX';
                }
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Некорректный email';
                }
                break;
            case 'text':
                if (value.length < 12 || value.length > 500) {
                    return 'Должно быть 12-500 символов';
                }
                break;
            default:
                return '';
        }
        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(key => {
            if (key !== 'consent') {
                const error = validateField(key, formData[key]);
                if (error) {
                    newErrors[key] = error;
                    isValid = false;
                }
            }
        });

        if (!formData.consent) {
            newErrors.consent = 'Необходимо дать согласие';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/data/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': token.csrfToken
                },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    phone: formData.phone,
                    email: formData.email,
                    text: formData.text
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    first_name: '',
                    last_name: '',
                    phone: '',
                    email: '',
                    text: '',
                    consent: false
                });
                setTimeout(() => {
                    handleCloseModal();
                }, 2000);
            } else {
                const data = await response.json();
                setErrors(data.errors || { general: 'Ошибка при отправке формы' });
                setSubmitStatus('error');
            }
        } catch (error) {
            setErrors({ general: 'Ошибка сети или сервера' });
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }

    };


    return (
        <section  className='form-center'>
            <div className='form-center_content'>
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Форма заявки</h2>

                    {submitStatus === 'success' && (
                        <div className="form-success">
                            Данные успешно приняты и отправлены в обработку
                        </div>
                    )}

                    {errors.general && (
                        <div className="form-error">{errors.general}</div>
                    )}

                    <div className="form-row">
                        <div className={`form-row__label ${errors.first_name ? 'has-error' : ''}`}>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                placeholder=" "
                                onChange={handleChange}
                                required
                            />
                            <label>Имя *</label>
                            {errors.first_name && <p className="error-message">{errors.first_name}</p>}
                        </div>

                        <div className={`form-row__label ${errors.last_name ? 'has-error' : ''}`}>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                placeholder=" "
                                onChange={handleChange}
                                required
                            />
                            <label>Фамилия *</label>
                            {errors.last_name && <p className="error-message">{errors.last_name}</p>}
                        </div>

                        <div className={`form-row__label ${errors.phone ? 'has-error' : ''}`}>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                placeholder=" "
                                onChange={handleChange}
                                required
                            />
                            <label>Телефон *</label>
                            {errors.phone && <p className="error-message">{errors.phone}</p>}
                        </div>

                        <div className={`form-row__label ${errors.email ? 'has-error' : ''}`}>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                placeholder=" "
                                onChange={handleChange}
                                required
                            />
                            <label>Email *</label>
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>
                    </div>

                    <div className={`textarea-wrapper ${errors.text ? 'has-error' : ''}`}>
          <textarea
              className="textarea"
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Напишите мне о своей проблеме"
              required
          />
                        {errors.text && <p className="error-message">{errors.text}</p>}
                    </div>

                    <label className={`checkbox ${errors.consent ? 'has-error' : ''}`}>
                        <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                        />
                        <p className='politic'>Отправляя информацию, вы даете согласие на обработку персональных данных в соответствии с <a>Пользовательским соглашением и Политикой конфиденциальности</a>.
                            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                        {errors.consent && <p className="error-message">{errors.consent}</p>}
                    </label>

                    <button
                        type="submit"
                        disabled={!formData.consent || isSubmitting}
                    >
                        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ModalForm;