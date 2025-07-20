import React from 'react';
import PropTypes from 'prop-types';

const ArrowRightIcon = ({
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
                {/* Невидимый path для совместимости (оригинальный элемент) */}
                <path
                    d="M27.83 20.53L27.8 20.53C27.5 20.23 27.5 19.76 27.8 19.46C28.09 19.17 28.56 19.17 28.86 19.46L28.86 19.49L27.83 20.53ZM28.86 60.5L28.86 60.53C28.56 60.82 28.09 60.82 27.8 60.53C27.5 60.23 27.5 59.76 27.8 59.46L27.83 59.46L28.86 60.5Z"
                    fill="none"
                    fillOpacity="0"
                    fillRule="nonzero"
                />

                {/* Основная стрелка (направлена вправо) */}
                <path
                    d="M28.33 20L48.33 40L28.33 60"
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

ArrowRightIcon.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
    opacity: PropTypes.number,
};

export default ArrowRightIcon;