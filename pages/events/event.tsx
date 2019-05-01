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
    finish_date: string;
    short_description: string;
    image: string;
    full_description?: string;
    ticket_description?: string;
    image_vk?: string;
    image_facebook?: string;
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
    const startAt = new Date(props.start_date);
    const finishAt = new Date(props.finish_date);

    return (
        <Container>
            <Head>
                <title>{props.name}</title>
                <body itemScope itemType="http://schema.org/Event" />
            </Head>
            <div className="event__image" style={{ backgroundImage: `url(${props.image})` }} />
            <h1 className="event__title" itemProp="name">
                {props.name}
            </h1>
            <div className="event__date">
                <meta itemProp="startDate" content={startAt.toISOString()} />
                <meta itemProp="endDate" content={finishAt.toISOString()} />
                <FormattedDate value={startAt} />
            </div>
            <div itemProp="location" itemScope itemType="http://schema.org/Place">
                <meta itemProp="name" content={props.venue.name} />
                <meta itemProp="address" content={props.venue.address} />
                <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
                    <meta itemProp="latitude" content={props.venue.latitude.toString()} />
                    <meta itemProp="longitude" content={props.venue.longitude.toString()} />
                </div>
            </div>
        </Container>
    );
};

EventPage.getInitialProps = async ctx => {
    return await api.event(ctx.query.id);
};

export default EventPage;
