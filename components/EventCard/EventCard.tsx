import * as React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';

import styles from './EventCard.module.css';

function EventDate(props: { startAt: Date; finishAt: Date }) {
    const currentDate = new Date();
    const needYear = currentDate.getFullYear() !== props.startAt.getFullYear();

    const needDate = props.startAt.getDate() !== props.finishAt.getDate();

    if (!needDate) {
        return (
            <FormattedDate value={props.startAt} month="long" day="numeric" year={needYear ? 'numeric' : undefined} />
        );
    }

    return (
        <React.Fragment>
            <FormattedDate value={props.startAt} day="numeric" />
            -
            <FormattedDate value={props.finishAt} month="long" day="numeric" year={needYear ? 'numeric' : undefined} />
        </React.Fragment>
    );
}

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
            className={classNames(styles.eventCard, {
                [styles.eventCard_disabled]: startAt.getTime() < Date.now()
            })}
            itemScope
            itemType="http://schema.org/Event"
        >
            <div className={styles.eventCard__date}>
                <meta itemProp="startDate" content={startAt.toISOString()} />
                <meta itemProp="endDate" content={finishAt.toISOString()} />
                <EventDate startAt={startAt} finishAt={finishAt} />
            </div>
            <div itemProp="location" itemScope itemType="http://schema.org/Place">
                <meta itemProp="name" content={props.venue.name} />
                <meta itemProp="address" content={props.venue.address} />
                <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
                    <meta itemProp="latitude" content={props.venue.latitude.toString()} />
                    <meta itemProp="longitude" content={props.venue.longitude.toString()} />
                </div>
            </div>
            <h1 className={styles.eventCard__title} itemProp="name">
                {props.name}
            </h1>
            <p className={styles.eventCard__description} itemProp="description">
                {props.short_description}
            </p>
            <div className={styles.eventCard__footer}>
                <Link href="/events/[id]" as={`/events/${props.id}`}>
                    <a className={styles.eventCard__link} itemProp="url">
                        Подробнее
                        <span className={styles.eventCard__linkIcon}>
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
