// components/ScrollToTopButton.js
import React from 'react';
import './scrollToTopButton.scss';
import CircleIcon from '../img/CircleIcon';

const ScrollToTopButton = () => {
    const handleClick = () => {
        const contentElement = document.querySelector('.content');
        if (contentElement) {
            contentElement.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <button className="up" onClick={handleClick}>
            <CircleIcon />
        </button>
    );
};

export default ScrollToTopButton;
