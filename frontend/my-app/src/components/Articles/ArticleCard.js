import React, { useState, useEffect } from "react";
import axios from "axios";
import './articlesCard.scss';

const ArticleCard = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                // Загружаем категории
                const categoriesResponse = await axios.get(
                    "http://127.0.0.1:8000/api/category/",
                    { signal: controller.signal }
                );
                setCategories(categoriesResponse.data);

                // Загружаем статьи
                const articlesResponse = await axios.get(
                    "http://127.0.0.1:8000/api/article/",
                    {
                        signal: controller.signal,
                        headers: { 'Accept': 'application/json' }
                    }
                );

                // Сортируем статьи по дате создания (новые сначала)
                const sortedArticles = [...articlesResponse.data.results].sort((a, b) =>
                    new Date(b.creation_date) - new Date(a.creation_date)
                );

                setArticles(sortedArticles);
                setFilteredArticles(sortedArticles);
                setLoading(false);
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError(err.response?.data?.detail ||
                        err.response?.data?.message ||
                        err.message);
                    setLoading(false);
                    console.error("Ошибка:", err);
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, []);

    // Фильтрация статей при изменении выбранной категории
    useEffect(() => {
        if (selectedCategory) {
            const filtered = articles.filter(
                article => article.category_name === selectedCategory.name
            );
            setFilteredArticles(filtered);
        } else {
            setFilteredArticles(articles);
        }
    }, [selectedCategory, articles]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(selectedCategory?.pk === category.pk ? null : category);
    };

    const showAllArticles = () => {
        setSelectedCategory(null);
    };

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;
    if (articles.length === 0) return <div>Нет статей для отображения</div>;

    return (
       <div className='main__content'>
           <div className="articles_container">
               <div className="articles_navigate">
                   <div className="category-filter">
                       <button
                           onClick={showAllArticles}
                           className={`filter-button ${!selectedCategory ? 'active' : ''}`}
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
                   {filteredArticles.map((article, index) => (
                       <div key={index} className="articles_container_article-card">
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
                           <div className="articles_container_article-content">
                               <h3>{article.title}</h3>
                               <p>Тип: {article.type}</p>
                               <p>Категория: {article.category_name}</p>
                               <p>Содержание: {article.content}</p>
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
                   ))}
               </section>
           </div>
       </div>
    );
};

export default ArticleCard;