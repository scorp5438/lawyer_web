import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticleCard = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchArticles = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/article", {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                setArticles(response.data.results);
                setLoading(false);
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError(err.response?.data?.detail ||
                        err.response?.data?.message ||
                        err.message);
                    setLoading(false);
                    console.error("Ошибка:", err.response?.data);
                }
            }
        };

        fetchArticles();

        return () => controller.abort();
    }, []);

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;
    if (articles.length === 0) return <div>Нет статей для отображения</div>;

    return (
        <div className="articles-container">
            {articles.map((article, index) => (
                <div key={index} className="article-card">
                    {article.image && (
                        <img
                            src={article.image}
                            alt={article.title}
                            className="article-image"
                        />
                    )}
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
            ))}
        </div>
    );
};

export default ArticleCard;