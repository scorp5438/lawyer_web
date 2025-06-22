import React, { useEffect, useState } from 'react';
import './head.scss';
import ModalForm from "../ModalForm/ModalForm";
import IconClose from "../svg/IconClose";
import { fetchTypes, fetchUserData } from '../utils/api';

const Head = ({ onBlogClick, onMainClick }) => {
    const [user, setUser] = useState([]);
    const [type, setType] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getTypes = async () => {
            try {
//                const response = await axios.get('http://127.0.0.1:8000/api/type/');
                const response = await axios.get('/api/type/');
                setType(response.data.types);
                const types = await fetchTypes();
                setType(types);
            } catch (err) {
                setError(err.message);
            }
        };
        getTypes();
    }, []);

    useEffect(() => {
        fetchUserData(setUser, setError);
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleTypeSelect = (selectedType) => {
        onBlogClick(selectedType);
        setIsOpen(false);
    };

    const scrollToProfile = () => {
        const profileSection = document.getElementById('profile-section');
        if (profileSection) {
            profileSection.scrollIntoView({ behavior: 'smooth' });
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
                                            Телефон: <a href={`tel:${user[0].phone}`}>{user[0].phone}</a>
                                        </li>
                                        <li className="head__nav_item">
                                            EMAIL: <a href={`mailto:${user[0].email}`}>{user[0].email}</a>
                                        </li>
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
                            <li className="head__nav_menu_item" onClick={() => setIsOpen(!isOpen)}>Блог
                                {isOpen && (
                                    <div className="head__nav_item_blog">
                                        {error && <p className="error">Ошибка: {error}</p>}
                                        <ul className="head__nav_menu_item">
                                            {type.map(t => (
                                                <li
                                                    key={t}
                                                    className="head__nav_item_blog_category"
                                                    onClick={() => handleTypeSelect(t)}
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

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleCloseModal}><IconClose /></button>
                        <ModalForm handleCloseModal={handleCloseModal} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Head;
