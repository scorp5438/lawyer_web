import React, {useEffect, useState} from 'react';
import './head.scss'
import ModalForm from "../ModalForm/ModalForm";
import axios from "axios";
import IconClose from "../svg/IconClose";

const Head = ({user, onBlogClick, onMainClick}) => {
    const [type, setType] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/type/');
                setType(response.data.types);
            } catch (err) {
                setError(err.message);
                console.error('Ошибка при загрузке практик:', err);
            }
        };

        fetchTypes();
    }, []);


    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleTypeSelect = (selectedType) => {
        onBlogClick(selectedType); // Передаём выбранный тип в родительский компонент
    };
    const scrollToProfile = () => {
        const profileSection = document.getElementById('profile-section');
        if (profileSection) {
            profileSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    return (
        <header className="App-header">
            <div className='header__navigate'>
                <div className='header__navigate_width'>
                    <div className="header__navigate_head">
                        <nav className="head__nav">
                            <ul className="head__nav_item">
                                {user.length > 0 ? (
                                    <>
                                        <li className="head__nav_item">
                                            Телефон: <a href={`tel:${user[0].phone}`}>{user[0].phone}</a></li>
                                        <li className="head__nav_item">
                                            EMAIL: <a href={`mailto:${user[0].email}`}>{user[0].email}</a></li>
                                    </>
                                ) : (
                                    <li className="nav-item">Загрузка данных...</li>
                                )}
                            </ul>


                        </nav>

                        <nav className="head__nav_menu">
                            <ul className="head__nav_menu_item" onClick={onMainClick}>Главная</ul>
                            <ul className="head__nav_menu_item" onClick={handleOpenModal}>Юридическая помощь</ul>
                            <ul className="head__nav_menu_item" onClick={scrollToProfile}>Обо мне</ul>
                            {/* Меняем здесь "Блог" на выпадающее меню */}
                            <li className="head__nav_menu_item" onClick={() => setIsOpen(!isOpen)}>Блог
                                {isOpen && (
                                    <div className="head__nav_item_blog">
                                        {error && <p className="error">Ошибка: {error}</p>}
                                        <ul className="head__nav_menu_item">
                                            {type.map(t => (
                                                <li
                                                    key={t}
                                                    className="head__nav_item_blog_category"
                                                    onClick={() => {
                                                        handleTypeSelect(t);
                                                        setIsOpen(false); // Закрыть меню после выбора
                                                    }}
                                                >
                                                    {t}
                                                </li>
                                            ))}

                                        </ul>

                                    </div>
                                )}
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Модальное окно с формой */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleCloseModal}><IconClose/></button>
                        <ModalForm onClose={handleCloseModal}/>
                    </div>
                </div>
            )}
        </header>
    );
};


export default Head;
