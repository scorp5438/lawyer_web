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
import VKIcon from "../IconNetworks/VKIcon";
import MaxIcon from "../IconNetworks/MaxIcon";

const SocialNetworks = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [userData] = await Promise.all([fetchUserData()]);
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

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;
    if (!user || user.length === 0) return null;

    const userData = user[0] || {};

    // Функция для проверки валидности URL
    const isValidUrl = (url) => {
        if (!url) return false;
        // Проверяем, что URL не пустой и не содержит placeholder значений
        const invalidValues = ['x.com', 'tg.com', 'wa.com', 'viber.com', 'instagram.com', ''];
        return url && !invalidValues.includes(url) && url !== 'undefined';
    };

    return (
        <div className='nav'>
            <nav className='nav_link'>
                {/* Facebook */}
                {isValidUrl(userData.fb) && (
                    <a href={userData.fb} target="_blank" rel="noopener noreferrer">
                        <FacebookIcon className='nav_link_svg'/>
                    </a>
                )}

                {/* Twitter/X */}
                {isValidUrl(userData.x) && (
                    <a href={userData.x} target="_blank" rel="noopener noreferrer">
                        <TwitterIcon className='nav_link_svg'/>
                    </a>
                )}

                {/* Telegram */}
                {isValidUrl(userData.tg) && (
                    <a href={userData.tg} target="_blank" rel="noopener noreferrer">
                        <TelegramIcon className='nav_link_svg'/>
                    </a>
                )}

                {/* WhatsApp */}
                {isValidUrl(userData.wa) && (
                    <a href={userData.wa} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className='nav_link_svg'/>
                    </a>
                )}

                {/* Viber */}
                {isValidUrl(userData.viber) && (
                    <a href={userData.viber} target="_blank" rel="noopener noreferrer">
                        <ViberIcon className='nav_link_svg'/>
                    </a>
                )}

                {/* Instagram */}
                {isValidUrl(userData.inst) && (
                    <a href={userData.inst} target="_blank" rel="noopener noreferrer">
                        <InstagramIcon className='nav_link_svg'/>
                    </a>
                )}

                {/* Website */}
                {isValidUrl(userData.site) && (
                    <a href={userData.site} target="_blank" rel="noopener noreferrer">
                        <WebsiteIcon className='nav_link_svg'/>
                    </a>
                )}

                {/* VK */}
                {isValidUrl(userData.vk) && (
                    <a href={userData.vk} target="_blank" rel="noopener noreferrer">
                        <VKIcon className='nav_link_svg'/>
                    </a>
                )}

                {/* Max */}
                {isValidUrl(userData.max) && (
                    <a href={userData.max} target="_blank" rel="noopener noreferrer">
                        <MaxIcon className='nav_link_svg'/>
                    </a>
                )}
            </nav>
        </div>
    );
};

export default SocialNetworks;