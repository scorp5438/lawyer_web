import React, {useState} from 'react';
import './Form.scss';

const ModallForm = () => {
    const[formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    consent: false
});

const
handleChange = (e) = > {
    const
{name, value, type, checked} = e.target;
setFormData(prevState= > ({
    ...prevState,
[name]: type == = 'checkbox' ? checked: value
}));
};

const
handleSubmit = (e) = > {
    e.preventDefault();
if (formData.consent)
{
    console.log('Данные отправлены:', formData);
// Здесь
можно
отправить
данные
на
сервер
} else {
    alert('Необходимо дать согласие на обработку персональных данных.');
}
};

return (
    < div className='form-wrapper' >
    < form className="form" onSubmit={handleSubmit} >
    < h2 > Форма заявки < / h2 >

    < div className="form-row" >
    < div className="form-row__label" >
    < input
    type="text"
    name="firstName"
    value={formData.firstName}
    placeholder=" "
    onChange={handleChange}
    required
    / >
    < label >
    Имя *

    < / label >
    < / div >
    < div className="form-row__label" >
    < input
    type="text"
    name="lastName"
    value={formData.lastName}
    placeholder=" "
    onChange={handleChange}
    required
    / >
    < label >
    Фамилия *

    < / label >
    < / div >
    < div className="form-row__label" >
    < input
    type="tel"
    name="phone"
    value={formData.phone}
    placeholder=" "
    onChange={handleChange}
    required
    / >
    < label >
    Телефон *

    < / label >
    < / div >
    < div className="form-row__label" >
    < input
    type="email"
    name="email"
    value={formData.email}
    placeholder=" "
    onChange={handleChange}
    required
    / >
    < label >
    Email *

    < / label >
    < / div >

    < / div >
    < textarea className="textarea" placeholder="Напишите мне о своей проблеме" > < / textarea >
    < label className="checkbox" >
    < input
    type="checkbox"
    name="consent"
    checked={formData.consent}
    onChange={handleChange}
    / >
    < p > Я соглашаюсь на обработку персональных данных < / p >
    < / label >
    < button
    type="submit"
    disabled={!formData.consent}
    >
    Отправить заявку
    < / button >
    < / form >
    < / div >
);
}

export default ModallForm;
