import * as React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import FormattedDate from '../FormattedDate/FormattedDate';

export type Event = {
    id: number;
    name: string;
    startsAt: string;
    descriptionShort?: string;
};

export default function EventCard(props: Event & { className?: string }) {
    const startsAt = new Date(props.startsAt);

    return (
        <div className={classNames('card', props.className)}>
            <div className="card-body">
                <h2 className="card-title h5">{props.name}</h2>
                <p>
                    <small className="text-muted">
                        <FormattedDate value={startsAt} />
                    </small>
                </p>
                {props.descriptionShort && <p>{props.descriptionShort}</p>}
            </div>
            <div className="card-footer">
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
