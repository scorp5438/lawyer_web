import React, {useState, useCallback, useEffect} from "react";
import axios from "axios";
import './footer.scss';


const Footer = () => {


    return (
        <header className="App-header">
            <nav className="head">
                <ul className="head__nav">


                        <>
                            <li className="head__nav_item"><span></span>Телефон: </li>
                            <li className="head__nav_item">Главная</li>
                            <li className="head__nav_item">ФИО: </li>
                            <li className="head__nav_item">EMAIL: </li>
                        </>

                </ul>
            </nav>
        </header>
    );

};
export default Footer;