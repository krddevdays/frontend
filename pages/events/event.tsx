import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';
import FormattedDate from '../../components/FormattedDate/FormattedDate';
import EventPrice, { TicketType } from '../../components/EventPrice/EventPrice';
import * as api from '../../api';
import Head from 'next/head';
import TimepadWidget from '../../components/TimepadWidget';

type Event = {
    id: number;
    name: string;
    startsAt: string;
    descriptionHtml?: string;
    url: string;
    isRegistrationOpened: boolean;
    ticketTypes: TicketType[];
};

type EventPageProps = Event;

const EventPage: NextFunctionComponent<EventPageProps,
    EventPageProps,
    NextContext & {
    query: {
        id: number;
    };
}> = props => {
    const startsAt = new Date(props.startsAt);

    return (
        <div className="pt-3">
            <Head>
                <title>{props.name}</title>
            </Head>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">{props.name}</h1>
                <div className="btn-toolbar mb-2 mb-md-0 ml-2">
                    {props.isRegistrationOpened ?
                        <React.Fragment>
                            <TimepadWidget id={props.id} />
                            <a target="_blank" href={props.url}
                               className="btn btn-sm btn-outline-secondary timepad-widget-button">
                                Зарегистрироваться
                            </a>
                        </React.Fragment>
                        :
                        <button disabled className="btn btn-sm btn-outline-secondary">
                            Зарегистрироваться
                        </button>
                    }
                </div>
            </div>
            <div>
                <small className="text-muted">
                    <FormattedDate value={startsAt} />
                </small>
                {' '}
                <EventPrice ticketTypes={props.ticketTypes} />
            </div>
            {props.descriptionHtml && <div dangerouslySetInnerHTML={{ __html: props.descriptionHtml }} />}
        </div>
    );
};

EventPage.getInitialProps = async ctx => {
    return await api.event(ctx.query.id, ctx.req);
};

export default EventPage;
