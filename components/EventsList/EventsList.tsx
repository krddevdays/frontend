import * as React from 'react';
import EventCard, { Event } from '../EventCard/EventCard';
import List from '../List/List';

export type EventsListProps = {
    events: Event[];
};

export default function EventsList(props: EventsListProps) {
    return (
        <List>
            {props.events.map((event, index) => (
                <EventCard {...event} key={index}/>
            ))}
        </List>
    );
}
