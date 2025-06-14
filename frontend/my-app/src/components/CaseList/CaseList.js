import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CaseList = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/case/');
                setCases(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Ошибка при загрузке дел:', err);
            }
        };

        fetchCases();
    }, []);

    if (loading) {
        return <div className="loading">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    if (cases.length === 0) {
        return <div className="no-cases">Нет доступных дел</div>;
    }

    return (
        <div className="case-list">
            <h2>Список дел</h2>
            <div className="cases-container">
                {cases.map((caseItem, index) => (
                    <div key={index} className="case-card">
                        <h3>{caseItem.name_case}</h3>
                        <p className="case-description">{caseItem.description}</p>
                        <div className="case-details">
                            <p><strong>Категория:</strong> {caseItem.case_category_name}</p>
                            <p><strong>Дата начала:</strong> {new Date(caseItem.start_date).toLocaleString()}</p>
                            {caseItem.end_date && (
                                <p><strong>Дата завершения:</strong> {new Date(caseItem.end_date).toLocaleString()}</p>
                            )}
                            {caseItem.review && (
                                <p><strong>Отзыв:</strong> {caseItem.review}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseList;