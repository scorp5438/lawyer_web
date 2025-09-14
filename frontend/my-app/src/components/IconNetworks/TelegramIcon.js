import React from 'react';

const TelegramIcon = ({
                          size = 24,
                          backgroundColor = '#2AABEE',
                          iconColor = 'white',
                          className = '',
                          ...props
                      }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            {...props}
        >
            <path
                d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0Z"
                fill={backgroundColor}
            />
            <path
                d="M17.894 7.584C17.97 7.366 17.91 7.122 17.746 6.966C17.58 6.81 17.34 6.77 17.134 6.864L5.82 11.716C5.574 11.828 5.422 12.076 5.442 12.344C5.462 12.612 5.65 12.834 5.91 12.9L8.77 13.66L15.25 9.2C15.39 9.098 15.566 9.136 15.662 9.258C15.758 9.38 15.744 9.552 15.63 9.658L10.58 14.258L10.4 17.2C10.388 17.336 10.464 17.46 10.586 17.51C10.708 17.56 10.85 17.526 10.936 17.424L12.63 15.298L15.57 17.228C15.732 17.326 15.938 17.31 16.082 17.188C16.226 17.066 16.274 16.866 16.2 16.696L13.95 11.5L16.77 8.7L17.894 7.584Z"
                fill={iconColor}
            />
        </svg>
    );
};

export default TelegramIcon;