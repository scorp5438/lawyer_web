import React from 'react';

const TwitterIcon = ({
                         size = 24,
                         color = 'black',
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
                d="M18.9014 2H21.8228L14.3343 10.675L23 22H16.2114L10.7957 14.9275L4.54137 22H1.61863L9.68863 12.7818L1.375 2H8.33537L13.2128 8.39125L18.9014 2ZM17.6094 20.0253H19.5134L6.86337 3.88025H4.78737L17.6094 20.0253Z"
                fill={color}
            />
        </svg>
    );
};

export default TwitterIcon;