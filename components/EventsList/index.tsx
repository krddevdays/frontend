import * as React from 'react';
import EventCard, { Event } from '../EventCard/EventCard';
import './index.css';

type EventsListProps = {
    events: Event[];
};

export default function EventsList(props: EventsListProps) {
    return (
        <div className="events-list">
            {props.events.map((event, index) => (
                <EventCard {...event} key={index} />
            ))}
        </div>
    );
}
