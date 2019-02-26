import * as React from 'react';
import './EventLocation.css';

const getMapSrc = (lat: number, lng: number) =>
    `https://static-maps.yandex.ru/1.x/?ll=${lat},${lng}&size=300,250&z=15&l=map&pt=${lat},${lng},org`;

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
    return (
        <div className="event-location">
            <small className="address-label text-muted font-italic d-block">{address}</small>

            <img
                className="map-image"
                alt={address}
                src={getMapSrc(lat, lng)}
            />
        </div>
    );
}