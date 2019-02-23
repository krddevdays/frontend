import * as React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import EventPrice, { TicketType } from '../EventPrice/EventPrice';
import FormattedDate from '../FormattedDate/FormattedDate';

export type Event = {
    id: number;
    name: string;
    startsAt: string;
    descriptionShort?: string;
    ticketTypes: TicketType[];
};

export default function EventCard(props: Event & { className?: string }) {
    const startsAt = new Date(props.startsAt);

    return (
        <div className={classNames('card', props.className)}>
            <div className="card-body">
                <div className="card-title">
                    <h2 className="h5">{props.name}</h2>
                </div>
                <div>
                    <small className="text-muted">
                        <FormattedDate value={startsAt} />
                    </small>{' '}
                    <EventPrice ticketTypes={props.ticketTypes} />
                </div>
                {props.descriptionShort && <p>{props.descriptionShort}</p>}
                <Link href={`/events/event?id=${props.id}`} as={`/events/${props.id}`}>
                    <a
                        className={classNames('btn', 'btn-sm', {
                            'btn-secondary': startsAt.getTime() <= Date.now(),
                            'btn-primary': startsAt.getTime() > Date.now()
                        })}
                    >
                        Подробнее
                    </a>
                </Link>
            </div>
        </div>
    );
}
