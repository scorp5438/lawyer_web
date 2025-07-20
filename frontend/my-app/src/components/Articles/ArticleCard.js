import React, {useState, useEffect, useRef} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import {fetchArticles, fetchCategories} from '../utils/api';
import './articlesCard.scss';

const ArticleCard = ({selectedType, setSelectedType }) => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [expandedCards, setExpandedCards] = useState({});
    const location = useLocation();
    const [initialStateApplied, setInitialStateApplied] = useState(false);
    const articleRefs = useRef([]);

    const pageSize = 10;

    useEffect(() => {
        if (!initialStateApplied && location.state) {
            if (location.state.type) {
                setSelectedType(location.state.type);
            }

            if (location.state.page) {
                setPage(location.state.page);
            }
        }
    }, [location.state, initialStateApplied]);

    useEffect(() => {
        if (!initialStateApplied && location.state && categories.length > 0) {
            if (location.state.category) {
                const foundCategory = categories.find(cat => cat.pk === location.state.category);
                if (foundCategory) {
                    setSelectedCategory(foundCategory);
                }
            }

            setInitialStateApplied(true); // переносим сюда
        }
    }, [categories, location.state, initialStateApplied]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Можно отключить наблюдение после появления
                        // observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1, // Срабатывает когда 10% элемента видно
                rootMargin: '0px 0px -50px 0px' // Небольшой отступ снизу
            }
        );

        if (articleRefs.current) {
            articleRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });
        }

        return () => {
            if (observer) {
                articleRefs.current.forEach((ref) => {
                    if (ref) observer.unobserve(ref);
                });
            }
        };
    }, [articles]);

    const loadArticles = async (category = null, page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchArticles({
                category,
                page,
                pageSize,
                selectedType
            });

            const {results, count} = data;

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
    const loadCategories = async () => {
        if (!selectedType) {
            setCategories([]);
            return;
        }
        try {
            const data = await fetchCategories(selectedType);
            setCategories(data);
        } catch (err) {
            console.error("Ошибка загрузки категорий:", err);
        }
    };

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

    useEffect(() => {
        loadCategories();
    }, [selectedType]);

    useEffect(() => {
        loadArticles(selectedCategory, page);
    }, [selectedType, selectedCategory, page]);

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
                            <div key={index}
                                 className="articles_container_article-card"
                                 ref={(el) => {
                                     articleRefs.current[index] = el;
                                     contentRefs.current[index] = el;}}
                                 style={{position: 'relative'}}>
                                {article.image_url && (
                                    <div className="articles_container_image-wrapper">
                                        <img
                                            src={article.image_url}
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
                                    <button
                                        className="read-more-button"
                                        onClick={() => navigate(`/static_react/article/${article.id}`, {
                                            state: {
                                                from: '/static_react/articles',
                                                page,
                                                category: selectedCategory?.pk,
                                                type: selectedType
                                            }
                                        })}
                                    >
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

                <div className="pagination-carts">
                    <button className="pagination-carts_toPage" onClick={() => goToPage(page - 1)} disabled={page === 1}>Назад</button>
                    <span>Страница {page} из {totalPages}</span>
                    <button className="pagination-carts_toPage" onClick={() => goToPage(page + 1)} disabled={page === totalPages}>Вперёд</button>
                </div>
            </div>
        </div>
    )
        ;
};

export default ArticleCard;
