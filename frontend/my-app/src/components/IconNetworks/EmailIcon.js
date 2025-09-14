import React from 'react';

const EmailIcon = ({
                       size = 24,
                       color = '#FFFFFF',
                       strokeColor = '#7F7F7F',
                       strokeWidth = 1.5,
                       className = '',
                       ...props
                   }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                fill={color}
            />
            <path
                d="M22 6L12 13L2 6"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                fill="none"
            />
        </svg>
    );
};

export default EmailIcon;