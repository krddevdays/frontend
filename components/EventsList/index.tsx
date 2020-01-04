import * as React from 'react';
import EventCard, { Event } from '../EventCard/EventCard';
import List from '../List';

type EventsListProps = {
    events: Event[];
};

export default function EventsList(props: EventsListProps) {
    return (
        <List>
            {props.events
                .sort((e1, e2) => (
                    Date.parse(e1.finish_date) > Date.parse(e2.finish_date)
                ) ? 1 : -1)
                .map((event, index) => (
                    <EventCard {...event} key={index}/>
                ))}
        </List>
    );
}
