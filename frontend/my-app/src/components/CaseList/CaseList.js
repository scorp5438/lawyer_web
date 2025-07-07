import React, {useState, useEffect} from 'react';
import {fetchSortedCases} from '../utils/api';
import './caseList.scss';
import ArrowLeftIcon from "../img/ArrowLeftIcon";
import ArrowRightIcon from "../img/ArrowRightIcon";

const CaseList = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const casesPerPage = 1;
    useEffect(() => {
        const loadCases = async () => {
            try {
                const data = await fetchSortedCases();

                setCases(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Ошибка при загрузке дел:', err);
            }
        };

        loadCases();
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
    const visibleCases = cases.slice(
        currentPage * casesPerPage,
        (currentPage + 1) * casesPerPage
    );
    const prevPage = () => {
        setCurrentPage(prev =>
            prev === 0 ? Math.floor((cases.length - 1) / casesPerPage) : prev - 1
        );
    };
    const nextPage = () => {
        setCurrentPage(prev =>
            (prev + 1) * casesPerPage >= cases.length ? 0 : prev + 1
        );
    };

    return (
        <div className='margin'>
            <div className="case-list-wrapper">
                <div className="case-list-header">
                    <h1 className="case-list_head">Список дел</h1>
                </div>
            </div>
            <div className="case-list">


                <div className="carousel-controls">
                    <button onClick={prevPage} className="carousel-arrow_left">
                        <ArrowLeftIcon
                            size={40}
                            color="rgb(75, 75, 75)"
                            strokeWidth={4}
                            className="custom-class"
                        />
                    </button>
                    <div className="case-list_container">
                        {visibleCases.map((caseItem, index) => (
                            <div key={index} className="case-list_container_card">
                                {/* Остальное содержимое карточки без изменений */}
                                <h3 className="case-list_container_card_head">{caseItem.name_case}</h3>
                                <p className="case-list_container_card_description">{caseItem.description}</p>
                                <div className="case-list_container_card_details">
                                    <p className="case-list_container_card_category">
                                        <strong className="case-list_container_card_category_name">Категория: </strong>
                                        {caseItem.case_category_name}</p>
                                    <p className="case-list_container_card_category">
                                        <strong className="case-list_container_card_category_date-on">Дата начала:</strong>
                                        {new Date(caseItem.start_date).toLocaleString()}</p>
                                    {caseItem.end_date && (
                                        <p className="case-list_container_card_category">
                                            <strong className="case-list_container_card_category_date-off">Дата
                                                завершения:</strong>
                                            {new Date(caseItem.end_date).toLocaleString()}</p>
                                    )}
                                    {caseItem.review && (
                                        <p className="case-list_container_card_feedback">
                                            <strong>Отзыв:</strong> {caseItem.review}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={nextPage} className="carousel-arrow_right">
                        <ArrowRightIcon
                            size={40}
                            color="#333"
                            strokeWidth={4}
                            className="custom-class"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CaseList;