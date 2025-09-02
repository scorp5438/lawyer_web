import React, { useEffect, useRef, useState } from 'react';
import { fetchAddress } from "../utils/api";
import './yandexMap.scss';

const YandexMap = () => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [addressData, setAddressData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAddressData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchAddress();
            setAddressData(data);
        } catch (err) {
            console.error('Ошибка при получении данных адреса:', err);
            setError('Не удалось загрузить данные адреса');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAddressData();
    }, []);

    useEffect(() => {
        if (!addressData || addressData.length === 0) return;

        const ymapsSrc = 'https://api-maps.yandex.ru/v3/?apikey=fa239969-b5e2-4934-ab8a-05ad35199110&lang=ru_RU';

        const loadScript = () => {
            return new Promise((resolve, reject) => {
                const existingScript = document.querySelector(`script[src="${ymapsSrc}"]`);
                if (existingScript) {
                    if (window.ymaps3) {
                        resolve();
                    } else {
                        existingScript.addEventListener('load', resolve);
                        existingScript.addEventListener('error', reject);
                    }
                    return;
                }

                const script = document.createElement('script');
                script.src = ymapsSrc;
                script.async = true;

                script.onload = resolve;
                script.onerror = () => {
                    console.error('Ошибка загрузки Яндекс.Карт SDK 3.0');
                    reject();
                };

                document.head.appendChild(script);
            });
        };

        const initMap = async () => {
            const ymaps3 = window.ymaps3;
            await ymaps3.ready;

            if (mapInstanceRef.current) {
                mapInstanceRef.current.destroy();
                mapInstanceRef.current = null;
                mapRef.current.innerHTML = '';
            }

            const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

            const originalCoordinates = addressData[0].coordinates;
            const correctCoordinates = [originalCoordinates[1], originalCoordinates[0]];

            console.log('Координаты из API:', originalCoordinates);
            console.log('Исправленные координаты для Яндекс.Карт:', correctCoordinates);

            const map = new YMap(mapRef.current, {
                location: {
                    center: correctCoordinates,
                    zoom: 15
                }
            });

            map.addChild(new YMapDefaultSchemeLayer());
            map.addChild(new YMapDefaultFeaturesLayer());

            const markerElement = document.createElement('div');
            markerElement.textContent = '📍';
            markerElement.style.fontSize = '24px';
            markerElement.style.cursor = 'pointer';

            markerElement.title = `${addressData[0].region}, ${addressData[0].city}, ${addressData[0].street}, ${addressData[0].house}`;

            // Используем исправленные координаты для маркера
            map.addChild(new YMapMarker({ coordinates: correctCoordinates }, markerElement));

            mapInstanceRef.current = map;
        };

        loadScript().then(initMap).catch((err) => {
            console.error('Ошибка инициализации карты:', err);
            setError('Ошибка загрузки карты');
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.destroy();
                mapInstanceRef.current = null;
            }
        };
    }, [addressData]);

    const handleRetry = () => {
        getAddressData();
    };

    return (
        <div className="map__content">
            <h2>Карта Яндекс</h2>

            {loading && <div className="map__loading">Загрузка данных...</div>}

            {error && (
                <div className="map__error">
                    <p>{error}</p>
                    <button onClick={handleRetry}>Попробовать снова</button>
                </div>
            )}

            {addressData && addressData.length > 0 && (
                <div className="map__info">
                    <p><strong>Адрес:</strong> {addressData[0].region}, {addressData[0].city}, {addressData[0].street}, {addressData[0].house}</p>
                    {/*<p><strong>Координаты:</strong> {addressData[0].coordinates[0]}, {addressData[0].coordinates[1]}</p>*/}
                </div>
            )}

            <div className="map__content_center" ref={mapRef} />
        </div>
    );
};

export default YandexMap;