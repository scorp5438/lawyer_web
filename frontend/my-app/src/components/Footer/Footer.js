import React, {useState, useCallback, useEffect} from "react";
import axios from "axios";

const Footer = ({user}) => {


    return (
        <header className="App-header">
            <nav>
                <ul className="nav">
                    {user.length > 0 ? (
                        <>
                            <li className="nav-item">Телефон: {user[0].phone}</li>
                            <li className="nav-item">ФИО: {user[0].first_name} {user[0].last_name}</li>
                            <li className="nav-item">EMAIL: {user[0].email}</li>
                        </>
                    ) : (
                        <li className="nav-item">Загрузка данных...</li>
                    )}
                </ul>
            </nav>
        </header>
    );

};
export default Footer;