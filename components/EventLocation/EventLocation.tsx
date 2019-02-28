import * as React from 'react';
import { useState } from 'react';
import './EventLocation.css';
import useScript from '../../lib/custom-hooks/useScript';

declare global {
    interface Window { ymaps: any; }
}

const API_KEY = '9e9809a5-fd4f-4f84-af9e-c17b2229db12';
const MAP_ZOOM = 15;

const getMapSrc = (lat: number, lng: number) =>
    `https://static-maps.yandex.ru/1.x/?ll=${lat},${lng}&size=300,250&z=${MAP_ZOOM}&l=map&pt=${lat},${lng},org`;

export type EventLocationProps = {
    country: string;
    city: string;
    address: string;
    coordinates: {
      lat: number,
      lng: number,
    };
};

export default function EventLocation(props: { location: EventLocationProps; }) {
    const { address, coordinates: { lat, lng } } = props.location;

    const [ loaded ] = useScript(`https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`);
    const [ mapHandle, setMapHandle ] = useState(null);

    if (loaded && !mapHandle) {
        window.ymaps.ready(() => {
            const map = new window.ymaps.Map('event-location-map', {
                center: [ lng, lat ],
                zoom: MAP_ZOOM
            });
            const myPlacemark = new window.ymaps.Placemark([ lng, lat ]);
            map.geoObjects.add(myPlacemark);
            setMapHandle(map);
        });
    }

    return (
        <div className="event-location">
            <small className="address-label text-muted font-italic d-block">{address}</small>
            {!loaded &&
            <img
                className="event-location-map map-image"
                alt={address}
                src={getMapSrc(lat, lng)}
            />}
            {loaded && <div id="event-location-map" className="event-location-map" />}
        </div>
    );
}