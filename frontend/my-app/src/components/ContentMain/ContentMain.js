import React, {useState, useEffect} from 'react';
import axios from 'axios';
import lawyerPhoto from '../img/lawyer.jpg';
import './mainContent.scss';
import ModalForm from "../ModalForm/ModalForm";

const ContentMain = () => {
    const [practices, setPractices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredPractice, setHoveredPractice] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});
    useEffect(() => {
        const fetchPractices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/practice/');
                setPractices(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Ошибка при загрузке практик:', err);
            }
        };

        fetchPractices();
    }, []);

    const handleMouseEnter = (practice, event) => {
        setHoveredPractice(practice);
        setTooltipPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    const handleMouseLeave = () => {
        setHoveredPractice(null);
    };
    return (
        <div className="main__content">
            <div className="main__content_content">
                <div className="main__content_content_block">
                    <div>
                        <div className="main__content_content_block_logo">
                            <div className="main__content_content_block_logo_h1">
                                <h1>SAProLex</h1>
                            </div>
                        </div>
                        <div className="main__content_content_block_dis">
                            <p className="main__content_content_block_dis_p">
                                ADVICE THAT MATTERS
                            </p>
                        </div>
                    </div>
                    <div className="main__content_content_img">
                        <img
                            className="main__content_content_img_photo"
                            src={lawyerPhoto}
                            alt="SAProLex"
                        />
                    </div>
                </div>

                <div className="main__content_content_info">
                    <div className="main__content_categary_info_blog">
                        <div className="main__content_categary_info_blog_head">
                            <h2>Моя практика</h2>
                        </div>
                        <div className="main__content_categary_info_blog_head_practice">
                            {loading ? (
                                <div className="loading">Загрузка данных...</div>
                            ) : error ? (
                                <div className="error">Ошибка: {error}</div>
                            ) : (
                                practices.map(practice => (
                                    <div
                                        key={practice.pk}
                                        className="practice-item"
                                        onMouseEnter={(e) => handleMouseEnter(practice, e)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <h3 className="practice-category">{practice.category}</h3>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Всплывающее окно с описанием */}
                    {hoveredPractice && (
                        <div
                            className="practice-tooltip"
                            style={{
                                position: 'fixed',
                                left: `${tooltipPosition.x + 15}px`,
                                top: `${tooltipPosition.y + 15}px`,
                                zIndex: 1000
                            }}
                        >
                            <div className="tooltip-content">
                                <h4>{hoveredPractice.category}</h4>
                                <p>{hoveredPractice.description}</p>
                            </div>
                        </div>
                    )}

                    <div>
                        <p>Вы можете задать свой вопрос мне</p>
                        <ModalForm/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentMain;
