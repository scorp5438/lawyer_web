import React, {useState, useEffect} from "react";
import {fetchUserData} from '../utils/api';
import SocialNetworks from '../SocialNetworks/SocialNetworks';
import './footer.scss';
import PhoneIcon from "../IconNetworks/PhoneIcon";
import EmailIcon from "../IconNetworks/EmailIcon";

const Footer = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [userData] = await Promise.all([
                    fetchUserData()
                ]);
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
    console.log(error);
    if (loading) {
        return <header className="App-header">Загрузка...</header>;
    }

    return (
        <header className="footer">
            <nav className="footer">
                <ul className="footer__nav">
                    {user.length > 0 ? (
                        <>
                            <li className="footer__nav_item">
                                <a href={`tel:${user[0].phone}`} className="footer__link" title="Телефон">
                                    <PhoneIcon/>
                                    <span className="footer__link-text">{user[0].phone}</span>
                                </a>
                            </li>
                            <li className="footer__nav_item">
                                <a href={`mailto:${user[0].email}`} className="footer__link" title="Эл.почта">
                                    <EmailIcon/>
                                    <span className="footer__link-text">{user[0].email}</span>
                                </a>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">Загрузка данных...</li>
                    )}
                </ul>
                <ul className="footer_nav_nav-icon">
                    {user.length > 0 ? (
                        <li className="footer_nav-icon">
                            <SocialNetworks/>
                        </li>
                    ) : (
                        <li className="nav-item">Загрузка данных...</li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Footer;