import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';
import FormattedDate from '../../components/FormattedDate/FormattedDate';
import EventLocation, { EventLocationProps } from '../../components/EventLocation/EventLocation';
import * as api from '../../api';
import Head from 'next/head';

type Event = {
    id: number;
    name: string;
    start_date: string;
    venue: EventLocationProps;
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
        <div className="container pt-3">
            <Head>
                <title>{props.name}</title>
            </Head>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">{props.name}</h1>
            </div>
            <div>
                <small className="text-muted">
                    <FormattedDate value={startsAt} />
                </small>
            </div>
            <EventLocation {...props.venue} />
        </div>
    );
};

EventPage.getInitialProps = async ctx => {
    return await api.event(ctx.query.id);
};

export default EventPage;
