import * as React from 'react';
import './EventLocation.css';

const getMapSrc = (lat: number, lng: number) =>
    `https://static-maps.yandex.ru/1.x/?ll=${lat},${lng}&size=300,250&z=15&l=map&pt=${lat},${lng},org`;

export type EventLocation = {
    country: string;
    city: string;
    address: string;
    coordinates: [number, number];
};

export default function EventLocationWidget(props: { location: EventLocation | undefined; }) {
    const { location } = props;
    if (location === undefined) {
        return null;
    }
    const { address, coordinates } = location;
    return (
        <div className="map-location">
            <small className="address-label text-muted font-italic d-block">{address}</small>

            <img
                className="map-image"
                alt={address}
                src={getMapSrc(coordinates[1], coordinates[0])}
            />
        </div>
    );
}