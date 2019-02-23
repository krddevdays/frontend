import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';
import EventCard, { Event } from '../../components/EventCard/EventCard';
import * as api from '../../api';
import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';
import * as url from 'url';

const types = [
    {
        id: 'conf' as 'conf',
        title: 'Conf'
    },
    {
        id: 'frontend' as 'frontend',
        title: 'Frontend'
    },
    {
        id: 'backend' as 'backend',
        title: 'Backend'
    },
    {
        id: 'python' as 'python',
        title: 'Python'
    }
];

type EventType = typeof types extends Array<{ id: infer U }> ? U : never;

type EventsPageProps = {
    events: Event[];
    types?: EventType[];
};

const EventsPage: NextFunctionComponent<
    EventsPageProps,
    EventsPageProps,
    NextContext & {
        query: {
            types?: EventType[] | EventType;
        };
    }
> = props => {
    return (
        <div className="pt-3">
            <Head>
                <title>События</title>
            </Head>
            <div className="pb-2 mb-3 border-bottom">
                <h1 className="h2">События</h1>
            </div>
            <div className="row my-3">
                <div className="col col-12">
                    <div className="btn-group" role="group">
                        {typeof props.types === 'undefined' ? (
                            <span className="btn btn-outline-secondary active">Все</span>
                        ) : (
                            <Link replace={true} href="/events">
                                <a className="btn btn-outline-secondary">Все</a>
                            </Link>
                        )}
                        {types.map((type, i) => {
                            const nextTypes = new Set<EventType>();

                            if (typeof props.types !== 'undefined') {
                                props.types.forEach(type => nextTypes.add(type));
                            }

                            const isActive = nextTypes.has(type.id);

                            nextTypes[isActive ? 'delete' : 'add'](type.id);

                            return (
                                <Link
                                    replace={true}
                                    href={url.format({
                                        pathname: '/events',
                                        query:
                                            nextTypes.size === types.length
                                                ? undefined
                                                : {
                                                      types: Array.from(nextTypes)
                                                  }
                                    })}
                                    key={i}
                                >
                                    <a
                                        className={classNames('btn', 'btn-outline-secondary', {
                                            active: isActive
                                        })}
                                    >
                                        {type.title}
                                    </a>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="row my-3">
                {props.events.map(event => {
                    return (
                        <div className="col col-12 col-lg-4 my-2" key={event.id}>
                            <EventCard {...event} className="h-100" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

EventsPage.getInitialProps = async ctx => {
    const types = typeof ctx.query.types === 'string' ? [ctx.query.types] : ctx.query.types;
    const events = await api.events(ctx.req);

    return {
        types,
        events:
            typeof types === 'undefined'
                ? events
                : events.filter(event =>
                      types.some(type => {
                          switch (type) {
                              case 'frontend':
                                  return event.name.startsWith('Krasnodar Frontend');
                              case 'backend':
                                  return event.name.startsWith('Krasnodar Backend');
                              case 'python':
                                  return event.name.startsWith('Krasnodar Python');
                              case 'conf':
                                  return event.name.startsWith('Krasnodar Dev Days');
                              default:
                                  ((value: never) => value)(type);
                                  return false;
                          }
                      })
                  )
    };
};

export default EventsPage;
