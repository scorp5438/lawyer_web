import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './articleDetails.scss';

const ArticleDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { article } = location.state || {};

    if (!article) {
        return <div>Данные статьи не найдены</div>;
    }

    return (
        <motion.div
            className="article-details"
            initial={{ opacity: 0, y: 50 }} // старт анимации
            animate={{ opacity: 1, y: 0 }} // куда анимироваться
            exit={{ opacity: 0, y: -50 }} // при уходе
            transition={{ duration: 0.5 }} // длительность
        >
            <button onClick={() => navigate(-1)}>Назад</button>
            <h2>{article.title}</h2>
            {article.image && (
                <img
                    src={article.image}
                    alt={article.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/path/to/default/image.jpg';
                    }}
                />
            )}
            <p><strong>Тип:</strong> {article.type}</p>
            <p><strong>Категория:</strong> {article.category_name}</p>
            <p><strong>Содержание:</strong> {article.content}</p>
            <p><strong>Создано:</strong> {new Date(article.creation_date).toLocaleString()}</p>
            {article.update_date !== article.creation_date && (
                <p><strong>Обновлено:</strong> {new Date(article.update_date).toLocaleString()}</p>
            )}
            <button
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Ссылка на статью скопирована!');
                }}
                style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}
            >
                Поделиться статьёй
            </button>

        </motion.div>
    );
};

export default ArticleDetails;
