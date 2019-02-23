import * as React from 'react';
import { NextFunctionComponent } from 'next';
import EventCard, { Event } from '../../components/EventCard/EventCard';
import * as api from '../../api';
import Head from 'next/head';

type EventsPageProps = {
    events: Event[];
};

const EventsPage: NextFunctionComponent<EventsPageProps> = props => {
    return (
        <div className="pt-3">
            <Head>
                <title>События</title>
            </Head>
            <div className="pb-2 mb-3 border-bottom">
                <h1 className="h2">События</h1>
            </div>
            <div className="row my-3">
                {props.events.map((event, i) => {
                    return (
                        <div className="col col-12 col-lg-4 my-2" key={i}>
                            <EventCard {...event} className="h-100" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

EventsPage.getInitialProps = async ctx => {
    return {
        events: await api.events(ctx.req)
    };
};

export default EventsPage;
