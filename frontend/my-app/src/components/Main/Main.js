import React, {useState, useEffect} from "react";
import Head from "../Head/Head";
// import Footer from "../Footer/Footer";

import {fetchData} from "../utils/api";
import ArticleCard from "../Articles/ArticleCard";
import axios from "axios";
import './main.scss'
import CaseList from "../CaseList/CaseList";
import ModalForm from '../ModalForm/ModalForm';
import lawyerPhoto from '../img/lawyer.jpg';

const Main = () => {
    const [user, setUser] = useState([]);
    const [categories, setCategories] = useState([]);
    const [practices, setPractices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        const url = "http://127.0.0.1:8000/api/user/";
        const headers = {
            'X-Superuser-Access': 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'
        };

        fetchData(url, headers, setUser, []);
    }, []);
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/category/');
                setCategories(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Ошибка при загрузке категорий:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchPractices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/practice/');
                setPractices(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Ошибка при загрузке практик:', err);
            }
        };

        fetchPractices();
    }, []);

    // const handleOpenModal = () => {
    //     setShowModal(true);
    // };
    //
    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };


    return (
        <div>
            <div>
                <Head
                    user={user}
                />
            </div>
            <div className="main__content">
                <div className="main__content_content">
                    <blockquote className="main__content_content_blockquote">
                        <div>
                            <div className="main__content_content_blockquote_logo">
                                <div className="main__content_content_blockquote_logo_h1">
                                    <h1>SAProLex</h1>
                                </div>
                            </div>
                            <div className="main__content_content_blockquote_dis">
                                <p className="main__content_content_blockquote_dis_p">
                                    ADVICE THAT MATTERS
                                </p>
                            </div>
                        </div>
                        <div className="main__content_content_img">
                            <img className='main__content_content_img_photo' src={lawyerPhoto} alt='photo'></img>
                        </div>
                    </blockquote>
                    <div className="main__content_content_info">

                        <div className="main__content_categary_info_blog">
                            <div className="main__content_categary_info_blog_head">
                                <h2>Моя практика</h2>
                            </div>
                            <div className="main__content_categary_info_blog_head_practice">
                                {loading ? (
                                    <div className="loading">Загрузка данных...</div>
                                ) : error ? (
                                    <div className="error">Ошибка: {error}</div>
                                ) : (
                                    practices.map(practice => (
                                        <div key={practice.pk} className="practice-item">
                                            <h3 className="practice-category">{practice.category}</h3>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <p>Вы можете задать свой вопрос мне</p>

                    </div>
                </div>
            </div>
            <section className="main__content_body">
                <ArticleCard/>
            </section>
            <section className="main__content_footer">
                <CaseList/>
            </section>


        </div>
    );
};

export default Main;


{/*<div className="main__content_categary">*/}
{/*    {loading && <p>Загрузка категорий...</p>}*/}
{/*    {error && <p className="error">Ошибка: {error}</p>}*/}
{/*    {categories.length > 0 && (*/}
{/*        <ul className="main__content_categary_categories-list">*/}
{/*            {categories.map(category => (*/}
{/*                <li key={category.pk} className="main__content_categary_categories-list_item">*/}
{/*                    {category.name}*/}
{/*                </li>*/}
{/*            ))}*/}
{/*        </ul>*/}
{/*    )}*/}
{/*</div>*/}