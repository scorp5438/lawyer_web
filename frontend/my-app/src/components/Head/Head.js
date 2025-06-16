import React, {useEffect, useState} from 'react';
import './head.scss'
import ModalForm from "../ModalForm/ModalForm";
import axios from "axios";
import IconClose from "../svg/IconClose";

const Head = ({user}) => {
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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                                       <li className="head__nav_item"><span></span>
                                           Телефон: <a href={`tel:${user[0].phone}`}>{user[0].phone}</a></li>
                                       <li className="head__nav_item">
                                           EMAIL: <a href={`mailto:${user[0].email}`}>{user[0].email}</a></li>
                                   </>
                               ) : (
                                   <li className="nav-item">Загрузка данных...</li>
                               )}
                           </ul>


                       </nav>

                   <div className='header__navigate_none'></div>
                   <nav className="head__nav_menu">
                       <ul className="head__nav_menu_item">Главная</ul>
                       <ul className="head__nav_menu_item" onClick={handleOpenModal}>Юридическая помощь</ul>
                       <ul className="head__nav_menu_item">Обо мне</ul>
                       <details className="blog-menu" onClick={toggleMenu}>
                           <summary className="head__nav_item">Блог</summary>
                           {error && <p className="error">Ошибка: {error}</p>}
                           {isOpen && type.length > 0 && (
                               <div className="head__nav_item_blog">
                                   <ul className="head__nav_menu_item">
                                       {type.map(t => (
                                           <li key={t} className="head__nav_item_blog_category">
                                               {t}
                                           </li>
                                       ))}
                                   </ul>
                               </div>
                           )}
                       </details>

                   </nav>
                   </div>
               </div>
            </div>
            {/* Модальное окно с формой */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleCloseModal}><IconClose /></button>
                        <ModalForm onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </header>
    );
};


export default Head;