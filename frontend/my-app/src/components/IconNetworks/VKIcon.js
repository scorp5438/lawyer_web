import React from 'react';

const VKIcon = ({
                    size = 29,
                    color = '#ffffff',
                    strokeColor = 'none',
                    strokeWidth = 0,
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
                d="M12.65 18.5C6.802 18.5 3.576 14.705 3.45 6.5H6.703C6.786 11.807 8.909 13.94 10.65 14.455V6.5H13.73V11.195C15.444 10.985 17.253 9.095 17.823 6.5H20.903C20.507 9.815 18.496 12.11 16.65 13.055C18.496 13.76 20.771 15.71 21.55 18.5H18.125C17.519 16.46 15.939 14.69 13.73 14.45V18.5H12.65Z"
                fill={color}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

export default VKIcon;