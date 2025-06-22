import React, { useState, useEffect } from "react";
import { fetchCategoriesData } from "../utils/api";
import ArticleCard from "../Articles/ArticleCard";
import './main.scss';
import ContentMain from "../ContentMain/ContentMain";
import Profile from "../Profile/Profile";
import CaseList from "../CaseList/CaseList";


//        const url = "http://127.0.0.1:8000/api/user/";
        const url = "/api/user/";
        const headers = {
            'X-Superuser-Access': 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'
        };
const Main = ({ activeSection, selectedType }) => {

        fetchData(url, headers, setUser, []);
    }, []);
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
//                const response = await axios.get('http://127.0.0.1:8000/api/category/');
                const response = await axios.get('/api/category/');
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
        const savedSection = localStorage.getItem('activeSection');
        if (savedSection) {
            setActiveSection(savedSection);
        }
    }, []);

    const handleSectionChange = (section) => {
        setActiveSection(section);
        localStorage.setItem('activeSection', section); // сохраняем выбор
    };

    const handleBlogClick = (type) => {
        if (selectedType === type) {
            setSelectedType(null); // сброс — можно заново выбрать
            setTimeout(() => setSelectedType(type), 0); // принудительный rerender
        } else {
            setSelectedType(type);
        }
        setActiveSection('blog');
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>

            <div>
                {activeSection === 'blog' ? (
                    <ArticleCard selectedType={selectedType} />
                ) : (
                    <ContentMain />
                )}
            </div>
            <div>{activeSection === 'blog' ||
                <div id="profile-section"><Profile /></div>
            }
            </div>
            <div>
                {activeSection === 'blog' &&
                    <div></div>
                }
            </div>
            <div>
                {activeSection === 'blog' ||
                    <CaseList />
                }
            </div>
        </div>
    );
};

export default Main;
