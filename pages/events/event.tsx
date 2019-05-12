import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';
import * as api from '../../api';
import Head from 'next/head';
import { FormattedDate, FormattedNumber, FormattedPlural, InjectedIntlProps, injectIntl } from 'react-intl';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import Container from '../../components/Container/Container';
import ScheduleTable, { ActivityProps, TalkActivityProps } from '../../components/ScheduleTable/ScheduleTable';
import TalkCard, { TalkCardProps } from '../../components/TalkCard/TalkCard';
import { EventDate } from '../../components/EventDate/EventDate';
import './event.css';

type TalksProps = {
    talks: TalkCardProps[];
};

function Talks(props: TalksProps) {
    if (props.talks.length === 0) {
        return null;
    }

    return (
        <section className="event-block event-talks">
            <h2 className="event-title event-talks__title">Доклады</h2>
            <div className="event-talks__list">
                {props.talks.map((talk, index) => (
                    <TalkCard key={index} {...talk} />
                ))}
            </div>
        </section>
    );
}

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
            <div className="event-schedule__table-wrapper">
                <ScheduleTable
                    className="event-schedule__table"
                    activitiesByZoneAndTime={activityByDateTimeAndZone[currentDate]}
                />
            </div>
        </section>
    );
});

type EventVenue = {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
};

export type EventTickets = {
    is_active: boolean;
    types: Array<{
        id: number;
        disabled: boolean;
        name: string;
        price: {
            current_value: string;
            default_value: string;
            modifiers: Array<
                | {
                      value: string;
                      type: 'sales_count';
                      sales_count: number;
                  }
                | {
                      value: string;
                      type: 'date';
                      active_from: string;
                      active_to: string;
                  }
            >;
        };
    }>;
    payments: Array<{
        id: number;
        type: 'card' | 'invoice';
    }>;
};

export type Event = {
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
    venue: EventVenue;
};

type EventPageProps = {
    event: Event;
    activities: ActivityProps[];
    tickets: EventTickets | null;
};

type EventInformationProps = { tickets: EventTickets | null; startDate: string; finishDate: string; venue: EventVenue };

function EventInformation(props: EventInformationProps) {
    const startAt = new Date(props.startDate);
    const finishAt = new Date(props.finishDate);

    const price = (props.tickets && props.tickets.is_active ? props.tickets.types : []).reduce<null | {
        min: string;
        max: string;
    }>((price, type) => {
        if (type.disabled) return price;

        if (price === null) {
            return {
                min: type.price.current_value,
                max: type.price.current_value
            };
        }

        const newPrice = { ...price };

        if (parseFloat(price.min) > parseFloat(type.price.current_value)) {
            newPrice.min = type.price.current_value;
        }

        if (parseFloat(price.max) < parseFloat(type.price.current_value)) {
            newPrice.max = type.price.current_value;
        }

        return newPrice;
    }, null);

    return (
        <ul className="event-information">
            {price !== null && (
                <li className="event-information__item event-information-item">
                    <div className="event-information-item__name">Стоимость участия</div>
                    <div className="event-information-item__content">
                        {price.min !== price.max ? (
                            <React.Fragment>
                                от{' '}
                                <FormattedNumber
                                    style="currency"
                                    value={parseFloat(price.min)}
                                    currency="RUB"
                                    minimumFractionDigits={0}
                                />{' '}
                                до{' '}
                                <FormattedNumber
                                    style="currency"
                                    value={parseFloat(price.max)}
                                    currency="RUB"
                                    minimumFractionDigits={0}
                                />
                            </React.Fragment>
                        ) : (
                            <FormattedNumber
                                style="currency"
                                value={parseFloat(price.min)}
                                currency="RUB"
                                minimumFractionDigits={0}
                            />
                        )}
                    </div>
                    <a className="event-information-item__action" href="#event_price">
                        Подробнее
                    </a>
                </li>
            )}
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
    );
}

type EventPriceProps = {
    tickets: EventTickets | null;
    description?: string;
};

type ConditionDate = { type: 'date'; active_from: Date; active_to: Date };
type ConditionSalesCount = { type: 'sales_count'; sales_count: number };

type Condition = ConditionDate | ConditionSalesCount;

function getMinConditionActiveFrom(conditions: Condition[]) {
    return conditions.reduce<null | Date>((minDate, condition) => {
        if (condition.type !== 'date') return minDate;

        if (minDate === null || condition.active_from.getTime() < minDate.getTime()) return condition.active_from;

        return minDate;
    }, null);
}

function EventPrice(props: EventPriceProps) {
    if (props.tickets === null || props.tickets.types.length === 0) return null;

    const types = props.tickets.types
        .filter(type => !type.disabled)
        .map(type => ({
            name: type.name,
            price: {
                value: type.price.default_value,
                steps: type.price.modifiers.reduce(
                    (steps, modifier) => {
                        let step = steps.find(step => step.value === modifier.value);

                        if (!step) {
                            step = {
                                value: modifier.value,
                                conditions: []
                            };

                            steps.push(step);
                        }

                        switch (modifier.type) {
                            case 'sales_count':
                                step.conditions.push({
                                    type: 'sales_count',
                                    sales_count: modifier.sales_count
                                });
                                break;
                            case 'date':
                                step.conditions.push({
                                    type: 'date',
                                    active_from: new Date(modifier.active_from),
                                    active_to: new Date(modifier.active_to)
                                });
                                break;
                            default:
                                ((_: never) => null)(modifier);
                        }

                        return steps;
                    },
                    [] as Array<{ value: string; conditions: Condition[] }>
                )
            }
        }));

    const steps: Array<{ conditions: Condition[]; types: Array<string | null> }> = [];

    types.forEach((type, typeIndex) => {
        type.price.steps.forEach(typeStep => {
            let step = steps.find(step =>
                step.conditions.some(
                    stepCondition =>
                        typeStep.conditions.find(typeStepCondition => {
                            if (typeStepCondition.type !== stepCondition.type) {
                                return false;
                            }

                            switch (stepCondition.type) {
                                case 'date':
                                    return (
                                        stepCondition.active_from.getTime() ===
                                        (typeStepCondition as ConditionDate).active_from.getTime()
                                    );
                                case 'sales_count':
                                    return (
                                        stepCondition.sales_count ===
                                        (typeStepCondition as ConditionSalesCount).sales_count
                                    );
                                default:
                                    return ((_: never) => false)(stepCondition);
                            }
                        }) !== undefined
                )
            );

            if (!step) {
                step = {
                    conditions: typeStep.conditions.slice(0),
                    types: new Array(types.length).fill(null)
                };
                steps.push(step);
            }

            step.types[typeIndex] = typeStep.value;
        });
    });

    steps.sort((a, b) => {
        const minActiveFromA = getMinConditionActiveFrom(a.conditions);
        if (minActiveFromA === null) return 1;

        const minActiveFromB = getMinConditionActiveFrom(b.conditions);
        if (minActiveFromB === null) return -1;

        return minActiveFromA.getTime() - minActiveFromB.getTime();
    });

    return (
        <section className="event-block event-price" id="event_price">
            <h2 className="event-title event-price__title">Стоимость участия</h2>
            <div className="event-price__table-wrapper">
                <table className="event-price__table">
                    <thead>
                        <tr>
                            <td />
                            {types.map((type, index) => (
                                <th key={index}>{type.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td />
                            {types.map((type, index) => (
                                <td key={index}>
                                    <FormattedNumber
                                        style="currency"
                                        value={parseFloat(type.price.value)}
                                        currency="RUB"
                                        minimumFractionDigits={0}
                                    />
                                </td>
                            ))}
                        </tr>
                        {steps.map((step, index) => (
                            <tr key={index}>
                                <td className="event-price__table-row-title">
                                    {step.conditions.map((condition, index) => {
                                        const lastItem = step.conditions.length === index + 1;
                                        const br = !lastItem && step.conditions.length > 1 && <br />;
                                        const or = lastItem && step.conditions.length > 1 && 'или';
                                        switch (condition.type) {
                                            case 'date':
                                                return (
                                                    <React.Fragment key={index}>
                                                        {or} с{' '}
                                                        <FormattedDate
                                                            value={condition.active_from}
                                                            month="long"
                                                            day="numeric"
                                                        />
                                                        {br}
                                                    </React.Fragment>
                                                );
                                            case 'sales_count':
                                                return (
                                                    <React.Fragment key={index}>
                                                        {or} от {condition.sales_count}{' '}
                                                        <FormattedPlural
                                                            value={condition.sales_count}
                                                            one="проданного билет"
                                                            many="проданных билетов"
                                                            other="проданного билета"
                                                        />
                                                        {br}
                                                    </React.Fragment>
                                                );
                                        }
                                    })}
                                </td>
                                {step.types.map((type, index) => (
                                    <td key={index}>
                                        {type && (
                                            <FormattedNumber
                                                style="currency"
                                                value={parseFloat(type)}
                                                currency="RUB"
                                                minimumFractionDigits={0}
                                            />
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {props.description && (
                <div className="event-price__description">
                    <Markdown>{props.description}</Markdown>
                </div>
            )}
        </section>
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
    const { event, tickets, activities } = props;
    const talks = (activities.filter(
        activity => activity.type === 'TALK' && activity.thing
    ) as TalkActivityProps[]).map(activity => activity.thing) as TalkCardProps[];

    return (
        <Container>
            <Head>
                <title>{event.name}</title>
                <meta property="og:title" content={event.name} />
                <meta property="og:description" content={event.short_description} />
                {event.image_vk && <meta property="vk:image" content={event.image_vk} />}
                {event.image_facebook && <meta property="og:image" content={event.image_facebook} />}
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
            <EventInformation
                tickets={tickets}
                startDate={event.start_date}
                finishDate={event.finish_date}
                venue={event.venue}
            />
            <Talks talks={talks} />
            <Schedule activities={activities} />
            <EventPrice tickets={tickets} description={event.ticket_description} />
        </Container>
    );
};

EventPage.getInitialProps = async ctx => {
    const event = await api.event(ctx.query.id);

    if (event === null) {
        const err = new Error();
        // @ts-ignore
        err.code = 'ENOENT';
        throw err;
    }

    let tickets;

    try {
        tickets = await api.eventTickets(ctx.query.id);
    } catch (e) {
        tickets = null;
    }

    return {
        event,
        activities: await api.eventActivities(ctx.query.id),
        tickets
    };
};

export default EventPage;
