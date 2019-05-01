import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';
import EventCard, { Event } from '../../components/EventCard/EventCard';
import * as api from '../../api';
import Head from 'next/head';

import Container from '../../components/Container/Container';
import './index.css';

type EventsPageProps = {
    events: Event[];
};

const EventsPage: NextFunctionComponent<EventsPageProps, EventsPageProps, NextContext> = props => {
    return (
        <Container>
            <Head>
                <title>Мероприятия</title>
            </Head>
            <h1 className="events__title">Мероприятия</h1>
            <div className="events__list">
                {props.events.map((event, index) => (
                    <EventCard {...event} key={index} />
                ))}
            </div>
        </Container>
    );
};

EventsPage.getInitialProps = async () => {
    const events = await api.events();

    return {
        events
    };
};

export default EventsPage;
