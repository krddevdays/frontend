import * as React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import FormattedDate from '../FormattedDate/FormattedDate';
import './EventCard.css';

export type Event = {
    id: number;
    name: string;
    start_date: string;
    finish_date: string;
    short_description: string;
    venue: {
        name: string;
        address: string;
        latitude: number;
        longitude: number;
    };
};

export default function EventCard(props: Event) {
    const startAt = new Date(props.start_date);
    const finishAt = new Date(props.finish_date);

    return (
        <article
            className={classNames('event-card', {
                'event-card_disabled': startAt.getTime() < Date.now()
            })}
            itemScope
            itemType="http://schema.org/Event"
        >
            <div className="event-card__date">
                <meta itemProp="startDate" content={startAt.toISOString()} />
                <meta itemProp="endDate" content={finishAt.toISOString()} />
                <FormattedDate value={startAt} />
            </div>
            <div itemProp="location" itemScope itemType="http://schema.org/Place">
                <meta itemProp="name" content={props.venue.name} />
                <meta itemProp="address" content={props.venue.address} />
                <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
                    <meta itemProp="latitude" content={props.venue.latitude.toString()} />
                    <meta itemProp="longitude" content={props.venue.longitude.toString()} />
                </div>
            </div>
            <h1 className="event-card__title" itemProp="name">
                {props.name}
            </h1>
            <p className="event-card__description" itemProp="description">
                {props.short_description}
            </p>
            <div className="event-card__footer">
                <Link href={`/events/event?id=${props.id}`} as={`/events/${props.id}`}>
                    <a className="event-card__link" itemProp="url">
                        Подробнее
                        <span className="event-card__link-icon">
                            <svg
                                width="5"
                                height="10"
                                viewBox="0 0 5 10"
                                fill="#0000CC"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 10L5 5L0 0V10Z" />
                            </svg>
                        </span>
                    </a>
                </Link>
            </div>
        </article>
    );
}
