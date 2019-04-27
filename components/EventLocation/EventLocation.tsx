import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import './EventLocation.css';
import useScript from '../../hooks/useScript';

const API_KEY = '2978e679-01ad-4adc-ad93-65add91ddf25';
const MAP_ZOOM = 15;

const getMapSrc = (lat: number, lng: number) =>
    `https://static-maps.yandex.ru/1.x/?ll=${lat},${lng}&size=300,250&z=${MAP_ZOOM}&l=map&pt=${lat},${lng},org`;

export type EventLocationProps = {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
};

export default function EventLocation(props: EventLocationProps) {
    const { name, address, latitude, longitude } = props;

    const title = `${name} (${address})`;

    const [loaded] = useScript(`https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`);
    const [mapInstance, setMapInstance] = useState<ymaps.Map | undefined>();
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loaded && !mapInstance) {
            ymaps.ready(() => {
                if (mapRef.current) {
                    const map = new ymaps.Map(mapRef.current, {
                        center: [latitude, longitude],
                        zoom: MAP_ZOOM
                    });
                    const myPlacemark = new ymaps.Placemark([latitude, longitude], {});
                    map.geoObjects.add(myPlacemark);
                    setMapInstance(map);
                }
            });
        }
    }, [loaded, mapInstance]);

    return (
        <div className="event-location">
            <small className="address-label text-muted font-italic d-block">{title}</small>
            {!loaded && (
                <img className="event-location-map map-image" alt={title} src={getMapSrc(longitude, latitude)} />
            )}
            {loaded && <div id="event-location-map" ref={mapRef} className="event-location-map" />}
        </div>
    );
}
