import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';
import FormattedDate from '../../components/FormattedDate/FormattedDate';
import EventPrice, { TicketType } from '../../components/EventPrice/EventPrice';
import * as api from '../../api';
import Head from 'next/head';

type Event = {
    id: number;
    name: string;
    startsAt: string;
    descriptionHtml?: string;
    ticketTypes: TicketType[];
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
    const startsAt = new Date(props.startsAt);

    return (
        <div className="pt-3">
            <Head>
                <title>{props.name}</title>
            </Head>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <div>
                    <h1 className="h2">{props.name}</h1>
                    <small className="text-muted">
                        <FormattedDate value={startsAt} />
                    </small>{' '}
                    <EventPrice ticketTypes={props.ticketTypes} />
                </div>
            </div>
            {props.descriptionHtml && <div dangerouslySetInnerHTML={{ __html: props.descriptionHtml }} />}
        </div>
    );
};

EventPage.getInitialProps = async ctx => {
    return await api.event(ctx.query.id, ctx.req);
};

export default EventPage;
