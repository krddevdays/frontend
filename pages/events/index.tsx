import * as React from 'react';
import { NextPageContext, NextComponentType, GetStaticProps } from 'next';
import { Event } from '../../components/EventCard/EventCard';
import * as api from '../../api';
import Head from 'next/head';

import EventsList from '../../components/EventsList/EventsList';

type EventsPageProps = {
    events: Event[];
};

const EventsPage: NextComponentType<NextPageContext, EventsPageProps, EventsPageProps> = props => {
    return (
        <div className='mt-12 max-w-7xl mx-auto sm:px-6 lg:px-8'>
            <Head>
                <title>Мероприятия</title>
            </Head>
            <h1 className='text-lg leading-6 font-medium text-gray-900'>Мероприятия</h1>
            <div className='mt-6'>
                <EventsList events={props.events} />
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps<EventsPageProps, never> = async function() {
    return {
        props: {
            events: await api.events()
        },
        revalidate: 10
    };
};

export default EventsPage;
