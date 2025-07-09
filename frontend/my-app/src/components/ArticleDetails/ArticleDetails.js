import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchArticleById } from '../utils/api';
import './articleDetails.scss';

const ArticleDetails = () => {
    const navigate = useNavigate();
    const location = useLocation(); // <-- добавлено
    const { id } = useParams(); // достаём id из URL

    // Получаем query параметры из location.search
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || 1;
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBack = () => {
        navigate(location.state?.from || '/static_react/articles', {
            state: {
                page: location.state?.page,
                category: location.state?.category,
                type: location.state?.type
            }
        });
    };

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchArticleById(id);
                setArticle(data);
            } catch (err) {
                setError(err.response?.data?.detail || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!article) return <div>Статья не найдена</div>;

    return (
        <motion.div
            className="article-details-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >
            <div className="article-details">
                <button
                    className="back-button"
                    onClick={handleBack}
                >
                    ← Назад к списку статей
                </button>

                <motion.div
                    className="article-header"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="article-title">{article.title}</h1>

                    <div className="article-meta">
                        <span className="meta-item">
                            <strong>Тип:</strong> {article.type}
                        </span>
                        <span className="meta-item">
                            <strong>Категория:</strong> {article.category_name}
                        </span>
                        <span className="meta-item">
                            <strong>Опубликовано:</strong> {new Date(article.creation_date).toLocaleString()}
                        </span>
                        {article.update_date !== article.creation_date && (
                            <span className="meta-item">
                                <strong>Обновлено:</strong> {new Date(article.update_date).toLocaleString()}
                            </span>
                        )}
                    </div>
                </motion.div>

                {article.image_url && (
                    <motion.div
                        className="article-image-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <img
                            className="article-image"
                            src={article.image_url}
                            alt={article.title}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/path/to/default/image.jpg';
                            }}
                        />
                    </motion.div>
                )}

                <motion.div
                    className="article-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="content-title">Содержание статьи</h3>
                    <div className="content-text">{article.content}</div>
                </motion.div>

                <motion.div
                    className="article-actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <button
                        className="share-button"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Ссылка на статью скопирована!');
                        }}
                    >
                        Поделиться статьёй
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ArticleDetails;
