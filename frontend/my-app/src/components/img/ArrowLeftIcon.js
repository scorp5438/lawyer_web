import React from 'react';
import PropTypes from 'prop-types';

const ArrowLeftIcon = ({
                           size = 80,
                           color = "#808080",
                           strokeWidth = 1.5,
                           opacity = 0.9,
                           ...props
                       }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g opacity={opacity}>
                {/* Невидимый path для совместимости (оригинальный элемент из вашего SVG) */}
                <path
                    d="M52.16 59.46L52.19 59.46C52.49 59.76 52.49 60.23 52.19 60.53C51.9 60.82 51.43 60.82 51.13 60.53L51.13 60.5L52.16 59.46ZM51.13 19.49L51.13 19.46C51.43 19.17 51.9 19.17 52.19 19.46C52.49 19.76 52.49 20.23 52.19 20.53L52.16 20.53L51.13 19.49Z"
                    fill="none"
                    fillOpacity="0"
                    fillRule="nonzero"
                />

                {/* Основная стрелка */}
                <path
                    d="M51.66 60L31.66 40L51.66 20"
                    stroke={color}
                    strokeOpacity="1"
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};

ArrowLeftIcon.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
    opacity: PropTypes.number,
};

export default ArrowLeftIcon;