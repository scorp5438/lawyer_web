import React, {useEffect, useState} from "react";
import {fetchUserData} from '../utils/api';
import './networks.scss';
import FacebookIcon from "../IconNetworks/FacebookIcon";
import TwitterIcon from "../IconNetworks/TwitterIcon";
import TelegramIcon from "../IconNetworks/TelegramIcon";
import WhatsAppIcon from "../IconNetworks/WhatsAppIcon";
import ViberIcon from "../IconNetworks/ViberIcon";
import InstagramIcon from "../IconNetworks/InstagramIcon";
import WebsiteIcon from "../IconNetworks/WebsiteIcon";


const SocialNetworks = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                const userData = await fetchUserData();

                // Добавьте console.log для отладки
                console.log('Данные от API:', userData);
                // Если API возвращает массив, берем первый элемент
                if (Array.isArray(userData) && userData.length > 0) {
                    setUser(userData);
                } else {
                    setUser(userData);
                }
            } catch (err) {
                setError(err.message);
                console.error('Ошибка загрузки данных:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);
    console.log('Состояние user:', user);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!user) return null;

    return(
        <div className='nav'>
            <nav className='nav_link'>
                <a href={`${user[0].fb}`}>
                    <FacebookIcon />
                </a>
                <a href={`${user[0].x}`}>
                    <TwitterIcon />
                </a>
                <a href={`${user[0].tg}`}>
                    <TelegramIcon />
                </a>
                <a href={`${user[0].wa}`}>
                    <WhatsAppIcon />
                </a>
                <a href={`${user[0].viber}`}>
                    <ViberIcon />
                </a>
                <a href={`${user[0].inst}`}>
                    <InstagramIcon />
                </a>
                <a href={`${user[0].site}`}>
                    <WebsiteIcon />
                </a>

            </nav>
        </div>
    );
}
export default SocialNetworks;