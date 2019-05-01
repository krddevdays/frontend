import * as React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import FormattedDate from '../FormattedDate/FormattedDate';
import './EventCard.css';

export type Event = {
    id: number;
    name: string;
    start_date: string;
};

export default function EventCard(props: Event) {
    const startsAt = new Date(props.start_date);

    return (
        <article
            className={classNames('event-card', {
                'event-card_disabled': startsAt.getTime() < Date.now()
            })}
            itemScope
            itemType="http://schema.org/Event"
        >
            <div className="event-card__date">
                <meta itemProp="startDate" content={startsAt.toISOString()} />
                <FormattedDate value={startsAt} />
            </div>
            <h1 className="event-card__title" itemProp="name">
                {props.name}
            </h1>
            <p className="event-card__description" itemProp="description">
                Ежегодная конференция разработчиков Краснодара и края
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
