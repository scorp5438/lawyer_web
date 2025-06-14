import React from 'react';
import './head.scss'

const Head = ({user}) => {

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
                       <ul className="head__nav_item">Главная</ul>
                       <ul className="head__nav_item">Юридическая помощь</ul>
                       <ul className="head__nav_item">Обо мне</ul>
                       <ul className="head__nav_item">Блог</ul>
                   </nav>
                   </div>
               </div>
            </div>

        </header>
    );
};


export default Head;