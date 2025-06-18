import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import './articlesCard.scss';

const ArticleCard = ({selectedType}) => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [expandedCards, setExpandedCards] = useState({});


    const pageSize = 10;

    const fetchArticles = async (category = null, page = 1) => {
        setLoading(true);
        setError(null);

        const params = {
            page,
            page_size: pageSize
        };

        if (category === 'all') {
            params.category = 'all';
        } else if (category) {
            params.category = category.pk;
        }

        if (selectedType) {
            params.type = selectedType;
        }

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/article/", {
                params,
                headers: {'Accept': 'application/json'}
            });

            const {results, count} = response.data;
            const sortedArticles = [...results].sort((a, b) =>
                new Date(b.creation_date) - new Date(a.creation_date)
            );

            setArticles(sortedArticles);
            setTotalPages(Math.ceil(count / pageSize));
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        } finally {
            setLoading(false);
        }
    };


    const fetchCategories = async () => {
        if (!selectedType) {
            setCategories([]); // если тип не выбран — категорий нет
            return;
        }
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/category/", {
                params: {type: selectedType} // передаем выбранный тип
            });
            setCategories(response.data);
        } catch (err) {
            console.error("Ошибка загрузки категорий:", err);
        }
    };
    const contentRefs = useRef({});
    useEffect(() => {
        const newExpandedCards = {};

        articles.forEach((article, index) => {
            const element = contentRefs.current[index];
            if (element && element.scrollHeight > 200) {
                newExpandedCards[index] = true;
            }
        });

        setExpandedCards(newExpandedCards);
    }, [articles]);

    // Загружаем категории один раз
    useEffect(() => {
        fetchCategories();
    }, []);

    // Загружаем статьи при изменении selectedType, selectedCategory или страницы
    useEffect(() => {
        fetchArticles(selectedCategory, page);
    }, [selectedType, selectedCategory, page]);

    const handleCategorySelect = (category) => {
        setPage(1);
        setSelectedCategory(selectedCategory?.pk === category.pk ? null : category);
    };

    const showAllArticles = () => {
        setPage(1);
        setSelectedCategory(null); // устанавливаем 'all' вместо null
    };

    const goToPage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;
    // if (articles.length === 0) return <div>Нет статей для отображения</div>;

    return (
        <div className='main__content'>
            <div className="articles_container">
                <div className="articles_navigate">
                    <div className="category-filter">
                        <button
                            onClick={showAllArticles}
                            className={`filter-button ${selectedCategory === null ? 'active' : ''}`}
                        >
                            Все
                        </button>

                        {categories.map(category => (
                            <button
                                key={category.pk}
                                onClick={() => handleCategorySelect(category)}
                                className={`filter-button ${selectedCategory?.pk === category.pk ? 'active' : ''}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <section className='article-block'>
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <div key={index} className="articles_container_article-card" style={{position: 'relative'}}>
                                {article.image && (
                                    <div className="articles_container_image-wrapper">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="articles_container_article-image"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/path/to/default/image.jpg';
                                            }}
                                        />
                                    </div>
                                )}
                                <div
                                    className="articles_container_article-content"
                                    ref={(el) => contentRefs.current[index] = el}
                                    style={{maxHeight: '200px', overflow: 'hidden'}}
                                >
                                    <h3>{article.title}</h3>
                                    <p>Тип: {article.type}</p>
                                    <p>Категория: {article.category_name}</p>
                                    <p>Содержание: {article.content}</p>
                                </div>

                                {expandedCards[index] && (
                                    <button className="read-more-button"
                                            onClick={() => navigate('/article-details', {state: {article}})}>
                                        Далее...
                                    </button>
                                )}

                                <div className="read-more-info">
                                    <p className="article-date">
                                        Создано: {new Date(article.creation_date).toLocaleString()}
                                    </p>
                                    {article.update_date !== article.creation_date && (
                                        <p className="article-updated">
                                            Обновлено: {new Date(article.update_date).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Нет статей для отображения</div>
                    )}
                </section>

                <div className="pagination">
                    <button onClick={() => goToPage(page - 1)} disabled={page === 1}>Назад</button>
                    <span>Страница {page} из {totalPages}</span>
                    <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>Вперёд</button>
                </div>
            </div>
        </div>
    )
        ;
};

export default ArticleCard;
