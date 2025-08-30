import React, {useState, useEffect} from 'react';

import './modalForm.scss';
import {fetchToken } from "../utils/api";
import Politic from "../Politic/Politic";
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
    const [showPolitic, setShowPolitic] = useState(false);
    const openPolitic = (e) => {
        e.preventDefault();
        setShowPolitic(true);
    };

    const closePolitic = () => {
        setShowPolitic(false);
    };
    useEffect(() => {
        return () => {
            // Очищаем все таймеры при размонтировании компонента
            Object.values(errors).forEach(error => {
                if (error.timer) {
                    clearTimeout(error.timer);
                }
            });
        };
    }, [errors]);
    useEffect(() => {
        const getToken = async () => {
            try {
                const headers = {
                    'X-Get-Token-Csrf-For-React': 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'
                };
                const tokenData = await fetchToken(headers);
                setToken(tokenData); // Убедитесь, что tokenData содержит csrfToken
            } catch (error) {
                console.error('Ошибка получения токена:', error);
                // Можно установить значение по умолчанию или показать ошибку
                setToken({ csrfToken: 'fallback-token' });
            }
        };

        getToken();
    }, []);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Очищаем ошибку и таймер при изменении поля
        if (errors[name]) {
            if (errors[name].timer) {
                clearTimeout(errors[name].timer);
            }
            setErrors(prev => {
                const updated = {...prev};
                delete updated[name];
                return updated;
            });
        }
        if (errors.general) {
            if (errors.general.timer) {
                clearTimeout(errors.general.timer);
            }
            setErrors(prev => {
                const updated = {...prev};
                delete updated.general;
                return updated;
            });
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
        Object.keys(errors).forEach(key => {
            if (errors[key].timer) {
                clearTimeout(errors[key].timer);
            }
        });
        Object.keys(formData).forEach(key => {
            if (key !== 'consent') {
                const error = validateField(key, formData[key]);
                if (error) {
                    newErrors[key] = {
                        message: error,
                        timer: setTimeout(() => {
                            setErrors(prev => {
                                const updated = {...prev};
                                delete updated[key];
                                return updated;
                            });
                        }, 5000) // 5 секунд
                    };
                    isValid = false;
                }
            }
        });

        if (!formData.consent) {
            newErrors.consent = {
                message: 'Необходимо дать согласие',
                timer: setTimeout(() => {
                    setErrors(prev => {
                        const updated = {...prev};
                        delete updated.consent;
                        return updated;
                    });
                }, 5000)
            };
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
            const response = await fetch('/api/data/', {
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
                    setSubmitStatus(null);
                    if (typeof handleCloseModal === 'function') {
                        handleCloseModal();
                    }
                }, 2000);
            } else {
                const data = await response.json();
                setErrors(prev => ({
                    ...prev,
                    general: {
                        message: data.errors?.general || 'Ошибка при отправке формы',
                        timer: setTimeout(() => {
                            setErrors(prev => {
                                const updated = {...prev};
                                delete updated.general;
                                return updated;
                            });
                        }, 5000)
                    }
                }));
                setSubmitStatus('error');
            }
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                general: {
                    message: 'Ошибка сети или сервера',
                    timer: setTimeout(() => {
                        setErrors(prev => {
                            const updated = {...prev};
                            delete updated.general;
                            return updated;
                        });
                    }, 5000)
                }
            }));
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className='form-center'>
            {showPolitic && <Politic onClose={closePolitic} />}
            <div className='form-center_content'>
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Форма заявки</h2>

                    {submitStatus === 'success' && (
                        <div className="form-success">
                            Данные успешно приняты и отправлены в обработку
                        </div>
                    )}

                    {errors.general && (
                        <div className="form-error">{errors.general.message}</div>
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
                            {errors.first_name && <p className="error-message">{errors.first_name.message}</p>}
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
                            {errors.last_name && <p className="error-message">{errors.last_name.message}</p>}
                        </div>

                        <div className={`form-row__label ${errors.phone ? 'has-error' : ''}`}>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                placeholder=" "
                                onFocus={() => {
                                    if (!formData.phone.startsWith('+7')) {
                                        setFormData(prev => ({...prev, phone: '+7'}));
                                    }
                                }}
                                onChange={handleChange}
                                required
                            />
                            <label>Телефон *</label>
                            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
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
                            {errors.email && <p className="error-message">{errors.email.message}</p>}
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
                        {errors.text && <p className="error-message">{errors.text.message}</p>}
                    </div>

                    <label className={`checkbox ${errors.consent ? 'has-error' : ''}`}>
                        <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                        />
                        <div className='politic'>
                            <p>Отправляя информацию, вы даете согласие на обработку персональных данных
                                в соответствии с <span  onClick={openPolitic}
                                                        className="politic-link">
                                    Пользовательским соглашением и Политикой конфиденциальности</span>.
                            </p>
                            {errors.consent && <p className="error-message">{errors.consent.message}</p>}
                        </div>

                    </label>

                    <button className="submit"
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