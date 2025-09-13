import React, {useEffect, useRef, useState} from 'react';
import './head.scss';
import ModalForm from "../ModalForm/ModalForm";
import IconClose from "../svg/IconClose";
import {fetchTypes, fetchUserData} from '../utils/api';
import {useNavigate} from 'react-router-dom';
import PhoneIcon from "../IconNetworks/PhoneIcon";
import EmailIcon from "../IconNetworks/EmailIcon";

const Head = ({onBlogClick, onMainClick, setShowOnlyProfile}) => {
    const [user, setUser] = useState([]);
    const [type, setType] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const blogMenuRef = useRef(null);
    const burgerRef = useRef(null);
    const blogItemRef = useRef(null);

    const handleClick = () => {
        onMainClick();
        setShowOnlyProfile(false);
        navigate('/');
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                blogMenuRef.current &&
                !blogMenuRef.current.contains(event.target) &&
                blogItemRef.current &&
                !blogItemRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside); // ← было 'mousedown'
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const handleProfileClick = () => {
        setShowOnlyProfile(true);
        navigate('/');
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
        navigate('/articles', {
            state: {
                type: selectedType
            }
        });
    };

    const handleBlogClick = () => {
        setIsOpen(!isOpen);
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
                                        <li className="head__nav_item_icon">
                                            <a href={`tel:${user[0].phone}`} title="Телефон"> <PhoneIcon/> {user[0].phone}</a>
                                        </li>
                                        <li className="head__nav_item_icon">
                                            <a href={`mailto:${user[0].email}`} title="Эл.почта"> <EmailIcon/> {user[0].email}</a>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">Загрузка данных...</li>
                                )}
                            </ul>
                        </nav>

                        <div className="head__nav_menu_wrapper">

                            <div
                                className="head__nav_menu_toggle"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                ref={burgerRef}
                            >
                                {mobileMenuOpen ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                                    </svg>
                                )}
                            </div>

                            <nav className="head__nav_menu desktop-menu">
                                <div className="head__nav_menu_item" onClick={handleClick}>Главная</div>
                                <div className="head__nav_menu_item" onClick={handleOpenModal}>Юридическая помощь</div>
                                <div className="head__nav_menu_item" onClick={handleProfileClick}>Обо мне</div>
                                <div
                                    className="head__nav_menu_item blog-item"
                                    onClick={(e) => {
                                        e.stopPropagation(); // ← добавили
                                        handleBlogClick();
                                    }}
                                    ref={blogItemRef}
                                >
                                    Блог
                                    {isOpen && (
                                        <div
                                            className="head__nav_item_blog"
                                            ref={blogMenuRef}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {error && <p className="error">Ошибка: {error}</p>}
                                            <ul className="head__nav_item_blog_list">
                                                {type.map((t) => (
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
                                </div>
                            </nav>

                            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'overlay-visible' : ''}`}
                                 onClick={() => setMobileMenuOpen(false)}>
                                <nav className={`head__nav_menu mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}
                                     onClick={(e) => e.stopPropagation()}>
                                    <div className="head__nav_menu_item" onClick={handleClick}>Главная</div>
                                    <div className="head__nav_menu_item" onClick={handleOpenModal}>Юридическая помощь</div>
                                    <div className="head__nav_menu_item" onClick={handleProfileClick}>Обо мне</div>
                                    <div
                                        className="head__nav_menu_item blog-item"
                                        onClick={handleBlogClick}
                                        ref={blogItemRef}
                                    >
                                        Блог
                                        {isOpen && (
                                            <div className="head__nav_item_blog" ref={blogMenuRef}>
                                                {error && <p className="error">Ошибка: {error}</p>}
                                                <ul className="head__nav_item_blog_list">
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
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleCloseModal}><IconClose/></button>
                        <ModalForm handleCloseModal={handleCloseModal}/>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Head;