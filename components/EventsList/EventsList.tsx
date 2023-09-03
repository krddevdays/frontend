import * as React from 'react';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';

type Event = {
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

export type EventsListProps = {
    events: Event[];
};

export default function EventsList(props: EventsListProps) {
    return (
        <ul role="list" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {props.events.map((event, index) => (
                <li
                    key={index}
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-start space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                    <Link href="/events/[id]" as={`/events/${event.id}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p
                            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                                new Date(event.start_date).getTime() >= Date.now()
                                    ? 'bg-green-100 text-green-800'
                                    : 'text-gray-500 bg-gray-100'
                            }`}
                        >
                            <EventDate startAt={new Date(event.start_date)} finishAt={new Date(event.finish_date)} />
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1.5">{event.name}</p>
                        <p className="text-sm text-gray-500">{event.short_description}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

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
