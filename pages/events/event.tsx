import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';
import FormattedDate from '../../components/FormattedDate/FormattedDate';
import * as api from '../../api';
import Head from 'next/head';

import Container from '../../components/Container/Container';
import './event.css';

type Event = {
    id: number;
    name: string;
    start_date: string;
    venue: {
        name: string;
        address: string;
        latitude: number;
        longitude: number;
    };
};

type EventPageProps = Event;

const EventPage: NextFunctionComponent<
    EventPageProps,
    EventPageProps,
    NextContext & {
        query: {
            id: number;
        };
    }
> = props => {
    const startsAt = new Date(props.start_date);

    return (
        <Container>
            <Head>
                <title>{props.name}</title>
                <html itemScope itemType="http://schema.org/Event" />
            </Head>
            <h1 className="event__title" itemProp="name">
                {props.name}
            </h1>
            <div className="event__date">
                <meta itemProp="startDate" content={startsAt.toISOString()} />
                <FormattedDate value={startsAt} />
            </div>
        </Container>
    );
};

EventPage.getInitialProps = async ctx => {
    return await api.event(ctx.query.id);
};

export default EventPage;
