import React, {useEffect, useRef, useState} from 'react';
import './head.scss';
import ModalForm from "../ModalForm/ModalForm";
import IconClose from "../svg/IconClose";
import { fetchTypes, fetchUserData } from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';

const Head = ({ onBlogClick, onMainClick, setShowOnlyProfile }) => {
    const [user, setUser] = useState([]);
    const [type, setType] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const blogMenuRef = useRef(null);


    const handleClick = () => {
        onMainClick();
        setShowOnlyProfile(false);
        navigate('/static_react/');
        setMobileMenuOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (blogMenuRef.current && !blogMenuRef.current.contains(event.target)) {
                // Проверяем, что клик был не по элементу меню "Блог"
                const blogMenuItem = document.querySelector('.head__nav_menu_item:last-child');
                if (blogMenuItem && !blogMenuItem.contains(event.target)) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        setShowOnlyProfile(true);
        navigate('/static_react/');
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [typesData, userData] = await Promise.all([
                    fetchTypes(),
                    fetchUserData()
                ]);
                setType(typesData);
                setUser(userData);
            } catch (err) {
                setError(err.message);
                console.error('Ошибка загрузки данных:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
        setMobileMenuOpen(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleTypeSelect = (selectedType) => {
        setShowOnlyProfile(false);
        onBlogClick(selectedType);
        setIsOpen(false);
        setMobileMenuOpen(false);

        // Всегда перенаправляем на страницу со статьями
        navigate('/static_react/articles', {
            state: {
                type: selectedType
            }
        });
    };

    if (loading) {
        return <header className="App-header">Загрузка...</header>;
    }

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

                        <div className="head__nav_menu_wrapper">
                            {/* Иконка гамбургера для мобильных */}
                            <div
                                className="head__nav_menu_toggle"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#ffffff" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                                </svg>
                            </div>

                            {/* Основное меню */}
                            <nav className={`head__nav_menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                                <ul className="head__nav_menu_item" onClick={handleClick}>Главная</ul>
                                <ul className="head__nav_menu_item" onClick={handleOpenModal}>Юридическая помощь</ul>
                                <ul className="head__nav_menu_item" onClick={handleProfileClick}>Обо мне</ul>
                                <li className="head__nav_menu_item" onClick={() => setIsOpen(!isOpen)}>
                                    Блог
                                    {isOpen && (
                                        <div className="head__nav_item_blog" ref={blogMenuRef}>
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