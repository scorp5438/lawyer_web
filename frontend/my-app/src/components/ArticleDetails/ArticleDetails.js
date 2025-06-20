import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './articleDetails.scss';

const ArticleDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { article } = location.state || {};

    if (!article) {
        return (
            <motion.div
                className="article-not-found"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Статья не найдена</h2>
                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    Вернуться назад
                </button>
            </motion.div>
        );
    }

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
                    onClick={() => navigate(-1)}
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

                {article.image && (
                    <motion.div
                        className="article-image-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <img
                            className="article-image"
                            src={article.image}
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