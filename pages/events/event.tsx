import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';
import * as api from '../../api';
import Head from 'next/head';
import { FormattedDate } from 'react-intl';

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

function EventDate(props: { startAt: Date; finishAt: Date }) {
    const currentDate = new Date();
    const needYear = currentDate.getFullYear() !== props.startAt.getFullYear();

    const needDate = props.startAt.getDate() !== props.finishAt.getDate();

    if (!needDate) {
        return (
            <React.Fragment>
                <FormattedDate
                    value={props.startAt}
                    month="long"
                    day="numeric"
                    year={needYear ? 'numeric' : undefined}
                />
                <br />
                с <FormattedDate value={props.startAt} hour="numeric" minute="numeric" /> до{' '}
                <FormattedDate value={props.finishAt} hour="numeric" minute="numeric" />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <FormattedDate value={props.startAt} day="numeric" />-
            <FormattedDate value={props.finishAt} month="long" day="numeric" year={needYear ? 'numeric' : undefined} />
            <br />
            с <FormattedDate value={props.startAt} hour="numeric" minute="numeric" /> до{' '}
            <FormattedDate value={props.finishAt} hour="numeric" minute="numeric" />
        </React.Fragment>
    );
}

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
            <div className="event-image" style={{ backgroundImage: `url(${props.image})` }} />
            <h1 className="event-title" itemProp="name">
                {props.name}
            </h1>
            <meta itemProp="image" content={props.image} />
            <p className="event-description" itemProp="description">
                {props.full_description || props.short_description}
            </p>
            <ul className="event-information">
                <li className="event-information__item event-information-item">
                    <div className="event-information-item__name">Место проведения</div>
                    <div
                        className="event-information-item__content"
                        itemProp="location"
                        itemScope
                        itemType="http://schema.org/Place"
                    >
                        <span itemProp="name">{props.venue.name}</span>
                        <br />
                        <span itemProp="address">{props.venue.address}</span>
                        <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
                            <meta itemProp="latitude" content={props.venue.latitude.toString()} />
                            <meta itemProp="longitude" content={props.venue.longitude.toString()} />
                        </div>
                    </div>
                    <a
                        className="event-information-item__action"
                        href={`https://yandex.ru/maps/?pt=${props.venue.longitude},${props.venue.latitude}&z=15&l=map`}
                        target="_blank"
                        rel="nofollow noopener"
                    >
                        Смотреть на карте
                    </a>
                </li>
                <li className="event-information__item event-information-item">
                    <div className="event-information-item__name">Дата и время</div>
                    <div className="event-information-item__content">
                        <meta itemProp="startDate" content={startAt.toISOString()} />
                        <meta itemProp="endDate" content={finishAt.toISOString()} />
                        <EventDate startAt={startAt} finishAt={finishAt} />
                    </div>
                </li>
            </ul>
        </Container>
    );
};

EventPage.getInitialProps = async ctx => {
    return await api.event(ctx.query.id);
};

export default EventPage;
