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
    console.log(error);
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [ userData] = await Promise.all([

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
                                <a href={`tel:${user[0].phone}`}> <PhoneIcon/> {user[0].phone}</a>
                            </li>
                            <li className="footer__nav_item">
                                <a href={`mailto:${user[0].email}`}> <EmailIcon/> {user[0].email}</a>
                            </li>

                        </>
                    ) : (
                        <li className="nav-item">Загрузка данных...</li>
                    )}

                </ul>
                <ul className="footer_nav_nav-icon">
                   {user.length > 0 ? (
                        <>
                            <li className="footer_nav-icon">
                                <SocialNetworks/>
                            </li>

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