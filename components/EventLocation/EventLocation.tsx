import * as React from 'react';
import { useRef, useState } from 'react';
import './EventLocation.css';
import useScript from '../../lib/custom-hooks/useScript';

const API_KEY = '2978e679-01ad-4adc-ad93-65add91ddf25';
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

export default function EventLocation(props: EventLocationProps) {
    const { address, coordinates: { lat, lng } } = props;

    const [ loaded ] = useScript(`https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`);
    const [ mapInstance, setMapInstance ] = useState<ymaps.Map | undefined>();
    const mapEl = useRef<HTMLDivElement>(null);

    if (loaded && !mapInstance) {
        ymaps.ready(() => {
            if (mapEl.current) {
                const map = new ymaps.Map(mapEl.current, {
                    center: [ lng, lat ],
                    zoom: MAP_ZOOM
                });
                const myPlacemark = new ymaps.Placemark([ lng, lat ], {});
                map.geoObjects.add(myPlacemark);
                setMapInstance(map);
            }
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
            {loaded && <div id="event-location-map" ref={mapEl} className="event-location-map" />}
        </div>
    );
}