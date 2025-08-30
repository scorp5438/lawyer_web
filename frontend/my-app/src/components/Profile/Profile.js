import React, {useEffect, useState} from "react";
import './profile.scss';
import {fetchUserData} from '../utils/api';

const AboutMe = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(error, loading);
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
    return (
        <section className="about__content">
            <div className="about__content_container">
                <h1 className="about__content_container_head">Обо мне</h1>
                <h2 className="about__content_container_hello">Приветствую всех!</h2>
                <blockquote className="about__content_container_description">
                    {user.length > 0 ? (
                        <>

                            <p className="item_name">Я {user[0].first_name} {user[0].last_name}  – член   Адвокатской палаты Краснодарского края.</p>
                            <p>{user[0].bio}</p>


                            <p>Вы всегда можете связаться со мной по: </p>
                            <div>
                                <div className="item">
                                    Телефон: <a href={`tel:${user[0].phone}`}>{user[0].phone}</a>
                                </div>
                                <div className="item">
                                    EMAIL: <a href={`mailto:${user[0].email}`}>{user[0].email}</a>
                                </div>
                            </div>
                        </>
                    ) : (
                        <li className="nav-item">Загрузка данных...</li>
                    )}

                </blockquote>
            </div>
        </section>
    );
}
export default AboutMe;
