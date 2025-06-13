import React, {useState, useCallback, useEffect} from "react";
import {fetchData} from "../utils/api";
import './head.scss'

const Head = ({user}) => {

    return (
        <header className="App-header">
            <nav className="head">
                <ul className="head__nav">

                    {user.length > 0 ? (
                        <>
                            <li className="head__nav_item"><span></span>Телефон: {user[0].phone}</li>
                            <li className="head__nav_item">Главная</li>
                            <li className="head__nav_item">ФИО: {user[0].first_name} {user[0].last_name}</li>
                            <li className="head__nav_item">EMAIL: {user[0].email}</li>
                        </>
                    ) : (
                        <li className="nav-item">Загрузка данных...</li>
                    )}
                </ul>
            </nav>
        </header>
    );
};


export default Head;