import React, {useState, useEffect} from "react";
import Head from "../Head/Head";
// import Footer from "../Footer/Footer";

import {fetchData} from "../utils/api";
import ArticleCard from "../Articles/ArticleCard";
import axios from "axios";
import './main.scss'
import ContentMain from "../ ContentMain/ContentMain";
import Footer from "../Footer/Footer";

const Main = () => {
    const [user, setUser] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('main');

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

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };


    return (
        <div>
            <div>
                <Head
                    user={user}
                    onBlogClick={() => handleSectionChange('blog')}
                    onMainClick={() => handleSectionChange('main')}
                />
            </div>
            <div>
                {activeSection === 'blog' ? <ArticleCard /> : <ContentMain />}
            </div>
            <div>
                {/*<Footer />*/}
            </div>
    </div>
    );
};

export default Main;
