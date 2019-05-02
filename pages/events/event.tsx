import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';
import * as api from '../../api';
import Head from 'next/head';
import { FormattedDate, InjectedIntlProps, injectIntl } from 'react-intl';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import Container from '../../components/Container/Container';
import ScheduleTable, { ActivityProps } from '../../components/ScheduleTable/ScheduleTable';
import './event.css';

type ScheduleProps = {
    activities: ActivityProps[];
} & InjectedIntlProps;

const Schedule = injectIntl(function(props: ScheduleProps) {
    const activityByDateTimeAndZone = React.useMemo(
        () =>
            props.activities.reduce(
                (result, activity) => {
                    const date = props.intl.formatDate(activity.start_date, {
                        day: '2-digit',
                        month: '2-digit'
                    });

                    if (!result[date]) {
                        result[date] = {};
                    }

                    const time = props.intl.formatDate(activity.start_date, {
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    if (!result[date][activity.zone]) {
                        result[date][activity.zone] = {};
                    }

                    if (!result[date][activity.zone][time]) {
                        result[date][activity.zone][time] = [];
                    }

                    result[date][activity.zone][time].push(activity);

                    return result;
                },
                {} as { [key: string]: { [key: string]: { [key: string]: ActivityProps[] } } }
            ),
        [props.activities, props.intl]
    );

    const dates = React.useMemo(() => Object.keys(activityByDateTimeAndZone), [activityByDateTimeAndZone]).sort();
    const [currentDate, setCurrentDate] = React.useState(dates[0]);

    if (props.activities.length === 0) {
        return null;
    }

    return (
        <section className="event-block event-schedule">
            <h2 className="event-title event-schedule__title">Расписание</h2>
            <div className="event-schedule__dates">
                {dates.length > 1 &&
                    dates.map((date, index) => (
                        <button
                            key={index}
                            type="button"
                            className={classNames('event-schedule__date', {
                                'event-schedule__date_active': currentDate === date
                            })}
                            onClick={event => {
                                event.preventDefault();
                                setCurrentDate(date);
                            }}
                        >
                            {date}
                        </button>
                    ))}
            </div>
            <ScheduleTable
                className=" event-schedule__table"
                activitiesByZoneAndTime={activityByDateTimeAndZone[currentDate]}
            />
        </section>
    );
});

type Event = {
    event: {
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
    activities: ActivityProps[];
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
            <FormattedDate value={props.startAt} day="numeric" />
            -
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
    const { event, activities } = props;
    const startAt = new Date(event.start_date);
    const finishAt = new Date(event.finish_date);

    return (
        <Container>
            <Head>
                <title>{event.name}</title>
                <body itemScope itemType="http://schema.org/Event" />
            </Head>
            <div className="event-image" style={{ backgroundImage: `url(${event.image})` }} />
            <h1 className="event-title" itemProp="name">
                {event.name}
            </h1>
            <meta itemProp="image" content={event.image} />
            <div className="event-description" itemProp="description">
                {event.full_description ? (
                    <Markdown>{event.full_description}</Markdown>
                ) : (
                    <p>{event.short_description}</p>
                )}
            </div>
            <ul className="event-information">
                <li className="event-information__item event-information-item">
                    <div className="event-information-item__name">Место проведения</div>
                    <div
                        className="event-information-item__content"
                        itemProp="location"
                        itemScope
                        itemType="http://schema.org/Place"
                    >
                        <span itemProp="name">{event.venue.name}</span>
                        <br />
                        <span itemProp="address">{event.venue.address}</span>
                        <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
                            <meta itemProp="latitude" content={event.venue.latitude.toString()} />
                            <meta itemProp="longitude" content={event.venue.longitude.toString()} />
                        </div>
                    </div>
                    <a
                        className="event-information-item__action"
                        href={`https://yandex.ru/maps/?pt=${event.venue.longitude},${event.venue.latitude}&z=15&l=map`}
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
            <Schedule activities={activities} />
        </Container>
    );
};

EventPage.getInitialProps = async ctx => {
    return {
        event: await api.event(ctx.query.id),
        activities: await api.eventActivities(ctx.query.id)
    };
};

export default EventPage;
