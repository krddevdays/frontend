import * as React from 'react';
import { NextPageContext, NextComponentType, GetServerSideProps } from 'next';
import * as api from '../../api';
import Head from 'next/head';

import EventsList from '../../components/EventsList/EventsList';
import { setContext } from '../../context';

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

export const getServerSideProps: GetServerSideProps<EventsPageProps, never> = async function(context) {
    setContext(context.req);

    return {
        props: {
            events: await api.events()
        }
    };
};

export default EventsPage;
