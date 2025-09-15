import React from 'react';
import ErrorMessage from "../img/error404.png"

const NotFound = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            textAlign: 'center',
            padding: '20px',
            '@media (max-width: 768px)': {
                height: '50vh',
                padding: '10px'
            },
            '@media (max-width: 480px)': {
                height: '40vh'
            }
        }}>
            <img
                src={ErrorMessage}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '300px',
                    '@media (max-width: 768px)': {
                        maxHeight: '200px'
                    },
                    '@media (max-width: 576px)': {
                        maxHeight: '150px'
                    }
                }}
                alt="Страница не найдена"
            />
            <p style={{
                fontSize: '18px',
                marginTop: '20px',
                '@media (max-width: 768px)': {
                    fontSize: '16px',
                    marginTop: '15px'
                },
                '@media (max-width: 360px)': {
                    fontSize: '14px',
                    marginTop: '10px'
                }
            }}>
                Такой страницы не существует.
            </p>
        </div>
    );
};

export default NotFound;