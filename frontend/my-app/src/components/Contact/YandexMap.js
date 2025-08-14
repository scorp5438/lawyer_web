import React, { useEffect, useRef } from 'react';

const YandexMap = () => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        const ymapsSrc = 'https://api-maps.yandex.ru/v3/?apikey=fb196f34-9e30-4890-a1c3-227bf444bcb8&lang=ru_RU';

        const loadScript = () => {
            return new Promise((resolve, reject) => {
                // Проверяем, не был ли уже добавлен этот скрипт
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

            // Уничтожаем карту, если она уже была создана
            if (mapInstanceRef.current) {
                mapInstanceRef.current.destroy();
                mapInstanceRef.current = null;
                mapRef.current.innerHTML = '';
            }

            const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

            const map = new YMap(mapRef.current, {
                location: {
                    center: [37.617644, 55.755819],
                    zoom: 10
                }
            });

            map.addChild(new YMapDefaultSchemeLayer());
            map.addChild(new YMapDefaultFeaturesLayer());

            const markerElement = document.createElement('div');
            markerElement.textContent = '📍';
            map.addChild(new YMapMarker({ coordinates: [37.617644, 55.755819] }, markerElement));

            mapInstanceRef.current = map;
        };

        loadScript().then(initMap).catch(console.error);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.destroy();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div>
            <h2>Карта Яндекс</h2>
            <div ref={mapRef} style={{ width: '1600px', height: '300px' }} />
        </div>
    );
};

export default YandexMap;
