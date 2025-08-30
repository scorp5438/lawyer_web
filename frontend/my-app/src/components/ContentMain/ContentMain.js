import React, {useState, useEffect} from 'react';
import {fetchPractices} from '../utils/api';
import lawyerPhoto from '../img/lawyer.jpg';
import './mainContent.scss';
import ModalForm from "../ModalForm/ModalForm";

const ContentMain = () => {
    const [practices, setPractices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredPractice, setHoveredPractice] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});
    const [showModal, setShowModal] = useState(false);
    console.log(showModal);
    useEffect(() => {
        const getPractices = async () => {
            try {
                const data = await fetchPractices();
                setPractices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getPractices();
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

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="main__content">
            <div className="main__content_content">
                <div className="main__content_content_block">
                    <div className="main__content_content_block_center">
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
                                practices.map((practice, index) => {
                                    const isLastOdd =
                                        practices.length % 2 === 1 && index === practices.length - 1;

                                    return (
                                        <div
                                            key={practice.pk}
                                            className={`practice-item ${isLastOdd ? 'full-width' : ''}`}
                                            onMouseEnter={(e) => handleMouseEnter(practice, e)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <h3 className="practice-category">{practice.category}</h3>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Всплывающее окно с описанием */}
                    {hoveredPractice && (
                        <div
                            className="practice-tooltip"
                            style={{
                                position: 'fixed',
                                left: `${tooltipPosition.x + 10}px`,
                                top: `${tooltipPosition.y + 10}px`,
                                zIndex: 1000
                            }}
                        >
                            <div className="tooltip-content">
                                <h4>{hoveredPractice.category}</h4>
                                <p>{hoveredPractice.description}</p>
                            </div>
                        </div>
                    )}

                    <div className="modal-center">
                        <p>Вы можете задать свой вопрос мне</p>
                        <ModalForm handleCloseModal={handleCloseModal}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentMain;
