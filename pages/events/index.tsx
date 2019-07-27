import * as React from 'react';
import { NextPageContext, NextComponentType } from 'next';
import { Event } from '../../components/EventCard/EventCard';
import * as api from '../../api';
import Head from 'next/head';

import Container from '../../components/Container/Container';
import EventsList from '../../components/EventsList';

type EventsPageProps = {
    events: Event[];
};

const EventsPage: NextComponentType<NextPageContext, EventsPageProps, EventsPageProps> = props => {
    return (
        <Container className="section">
            <Head>
                <title>Мероприятия</title>
            </Head>
            <h1 className="section__title">Мероприятия</h1>
            <div className="section__content">
                <EventsList events={props.events} />
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
