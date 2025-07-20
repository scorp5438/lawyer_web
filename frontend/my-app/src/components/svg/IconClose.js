import React from 'react';

const IconClose = ({ width = 32, height = 32, fill = "#808080" }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 28.2498 28.2499"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <filter
                id="filter_23_2_dd"
                x="0" y="0"
                width="32"
                height="32"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dx="0" dy="4" />
                <feGaussianBlur stdDeviation="1.33333" />
                <feComposite in2="hardAlpha" operator="out" k2="-1" k3="1" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect_dropShadow_1"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect_dropShadow_1"
                    result="shape"
                />
            </filter>
        </defs>
        <g filter="url(#filter_23_2_dd)">
            <path
                d="M4.75 3.35L7.35 0.75L14.12 7.52L20.89 0.75L23.5 3.35L16.72 10.12L23.5 16.89L20.89 19.5L14.12 12.72L7.35 19.5L4.75 16.89L11.52 10.12L4.75 3.35Z"
                fill={fill}
                fillOpacity="1"
                fillRule="evenodd"
            />
            <path
                d="M7.35 0.75L14.12 7.52L20.89 0.75L23.5 3.35L16.72 10.12L23.5 16.89L20.89 19.5L14.12 12.72L7.35 19.5L4.75 16.89L11.52 10.12L4.75 3.35L7.35 0.75Z"
                stroke={fill}
                strokeOpacity="1"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </g>
    </svg>
);

export default IconClose;
