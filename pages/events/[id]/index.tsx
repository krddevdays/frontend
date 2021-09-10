import * as React from 'react';
import { NextPageContext, NextComponentType, GetServerSideProps } from 'next';
import * as api from '../../../api';
import Head from 'next/head';
import { FormattedDate, FormattedNumber, useIntl } from 'react-intl';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';

import Container from '../../../components/Container/Container';
import ScheduleTable, { ActivityProps } from '../../../components/ScheduleTable/ScheduleTable';
import TalkCard, { TalkCardProps } from '../../../components/TalkCard/TalkCard';
import DiscussionCard from '../../../components/DiscussionCard/DiscussionCard';
import DiscussionForm from '../../../components/DiscussionForm/DiscussionForm';
import { EventDate } from '../../../components/EventDate/EventDate';
import List from '../../../components/List/List';
import styles from '../../../styles/EventPage.module.css';
import ym from 'react-yandex-metrika';
import { setContext } from '../../../context';

type TalksProps = {
    talks: TalkCardProps[];
};

function Talks(props: TalksProps) {
    if (props.talks.length === 0) {
        return null;
    }

    return (
        <section className="section">
            <h2 className="section__title">Доклады</h2>
            <div className="section__content">
                <div className={styles.eventTalks__list}>
                    {props.talks.map((talk, index) => (
                        <TalkCard key={index} {...talk} />
                    ))}
                </div>
            </div>
        </section>
    );
}

type Discussion = {
    id: number;
    event_id: number;
    title: string;
    description: string;
    votes_count: number;
    my_vote: boolean;
};

type DiscussionsProps = {
    eventId: number;
    discussions: Discussion[];
};

// @ts-ignore
function Discussions(props: DiscussionsProps) {
    const [discussions, setDiscussions] = React.useState(props.discussions);

    React.useEffect(() => {
        setDiscussions(props.discussions);
    }, [props.discussions]);

    const handleAdd = React.useCallback(
        discussion => {
            setDiscussions(discussions => [...discussions, discussion]);
        },
        [setDiscussions]
    );

    return (
        <section className="section">
            <h2 className="section__title">Круглые столы</h2>
            <div className="section__content">
                <p>
                    Это возможность собраться с единомышленниками и обсудить интересную вам тему. Вы можете подать свою
                    или проголосовать за другие.
                    <br />
                    Самые популярные темы будут выбраны в программу, а их авторы станут модераторами дискуссий.
                </p>
                <List>
                    {discussions.map((discussion, index) => (
                        <DiscussionCard key={index} {...discussion} />
                    ))}
                    <DiscussionForm eventId={props.eventId} onAdd={handleAdd} />
                </List>
            </div>
        </section>
    );
}

type ScheduleProps = {
    activities: ActivityProps[];
};

function Schedule(props: ScheduleProps) {
    const intl = useIntl();

    const activityByDateTimeAndZone = React.useMemo(
        () =>
            props.activities.reduce((result, activity) => {
                const date = intl.formatDate(activity.start_date, {
                    day: '2-digit',
                    month: '2-digit'
                });

                if (!result[date]) {
                    result[date] = {};
                }

                const time = intl.formatDate(activity.start_date, {
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
            }, {} as { [key: string]: { [key: string]: { [key: string]: ActivityProps[] } } }),
        [props.activities, intl]
    );

    const dates = React.useMemo(() => Object.keys(activityByDateTimeAndZone), [activityByDateTimeAndZone]).sort();
    const [currentDate, setCurrentDate] = React.useState(dates[0]);

    if (props.activities.length === 0) {
        return null;
    }

    return (
        <section className="section">
            <h2 className="section__title">Расписание</h2>
            <div className="section__action">
                {dates.length > 1 &&
                    dates.map((date, index) => (
                        <button
                            key={index}
                            type="button"
                            className={classNames(styles.eventScheduleDate, {
                                [styles.eventScheduleDate_active]: currentDate === date
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
            <div className={classNames('section__content', styles.eventScheduleTable__wrapper)}>
                <ScheduleTable
                    className={styles.eventScheduleTable}
                    activitiesByZoneAndTime={activityByDateTimeAndZone[currentDate]}
                />
            </div>
        </section>
    );
}

type EventVenue = {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
};

export type EventTickets = {
    is_active: boolean;
    sale_start_date: string | null;
    sale_finish_date: string;
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
        type: 'card' | 'invoice' | 'free';
        agree_url: string;
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
    talks: TalkCardProps[];
    discussions: Discussion[] | null;
    tickets: EventTickets | null;
};

type EventPageParams = {
    id: string;
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
        <ul className={styles.eventInformation}>
            {price !== null && (
                <li className={classNames(styles.eventInformation__item, styles.eventInformationItem)}>
                    <div className={styles.eventInformationItem__name}>Стоимость участия</div>
                    <div className={styles.eventInformationItem__content}>
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
                        ) : price.min === '0.00' ? (
                            'Бесплатно'
                        ) : (
                            <FormattedNumber
                                style="currency"
                                value={parseFloat(price.min)}
                                currency="RUB"
                                minimumFractionDigits={0}
                            />
                        )}
                    </div>
                    <a className={styles.eventInformationItem__action} href="#event_price">
                        Подробнее
                    </a>
                </li>
            )}
            <li className={classNames(styles.eventInformation__item, styles.eventInformationItem)}>
                <div className={styles.eventInformationItem__name}>Место проведения</div>
                <div
                    className={styles.eventInformationItem__content}
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
                    className={styles.eventInformationItem__action}
                    href={`https://yandex.ru/maps/?pt=${props.venue.longitude},${props.venue.latitude}&z=15&l=map`}
                    target="_blank"
                    rel="noreferrer nofollow noopener"
                >
                    Смотреть на карте
                </a>
            </li>
            <li className={classNames(styles.eventInformation__item, styles.eventInformationItem)}>
                <div className={styles.eventInformationItem__name}>Дата и время</div>
                <div className={styles.eventInformationItem__content}>
                    <meta itemProp="startDate" content={startAt.toISOString()} />
                    <meta itemProp="endDate" content={finishAt.toISOString()} />
                    <EventDate startAt={startAt} finishAt={finishAt} />
                </div>
            </li>
        </ul>
    );
}

type EventPriceProps = {
    eventId: number;
    tickets: EventTickets | null;
    description?: string;
};

function EventPrice(props: EventPriceProps) {
    if (props.tickets === null || props.tickets.types.length === 0) return null;

    let ticketsAvailable = props.tickets.is_active;

    if (ticketsAvailable && props.tickets.sale_start_date !== null) {
        ticketsAvailable = new Date(props.tickets.sale_start_date).getTime() <= new Date().getTime();
    }

    if (ticketsAvailable) {
        ticketsAvailable = new Date(props.tickets.sale_finish_date).getTime() > new Date().getTime();
    }

    const types = props.tickets.types.map(type => ({
        name: type.name,
        price: {
            value: type.price.current_value
        }
    }));

    return (
        <section className="section" id="event_price">
            <h2 className="section__title">Стоимость участия</h2>
            <div className="section__content">
                <div className={styles.eventPriceItems}>
                    {types.map((type, index) => (
                        <div className={styles.eventPriceItem} key={index}>
                            <div className={styles.eventPriceItem__title}>{type.name}</div>
                            <div className={styles.eventPriceItem__value}>
                                {type.price.value === '0.00' ? (
                                    'Бесплатно'
                                ) : (
                                    <FormattedNumber
                                        style="currency"
                                        value={parseFloat(type.price.value)}
                                        currency="RUB"
                                        minimumFractionDigits={0}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {ticketsAvailable && (
                    <div className={styles.eventPriceButton}>
                        <Link href="/events/[id]/order" as={`/events/${props.eventId}/order`}>
                            <a
                                className="button"
                                onClick={() => {
                                    ym('reachGoal', 'click_event_buy_button', {
                                        event_id: props.eventId
                                    });
                                }}
                            >
                                Зарегистрироваться
                            </a>
                        </Link>
                        <p className={styles.eventPriceButton__description}>
                            Регистрация открыта до{' '}
                            <FormattedDate value={props.tickets.sale_finish_date} month="long" day="numeric" />
                        </p>
                    </div>
                )}
                {!ticketsAvailable && (
                    <div className={styles.eventPriceButton}>
                        <p className={styles.eventPriceButton__description}>Регистрация закрыта</p>
                    </div>
                )}
                {props.description && (
                    <div className="prose max-w-none">
                        <Markdown>{props.description}</Markdown>
                    </div>
                )}
            </div>
        </section>
    );
}

const EventPage: NextComponentType<
    NextPageContext & {
        query: {
            id: number;
        };
    },
    EventPageProps,
    EventPageProps
> = props => {
    const { event, tickets, activities, talks } = props;

    return (
        <Container itemScope itemType="http://schema.org/Event">
            <Head>
                <title>{event.name}</title>
                <meta property="og:title" content={event.name} />
                <meta property="og:description" content={event.short_description} />
                {event.image_vk && <meta property="vk:image" content={event.image_vk} />}
                {event.image_facebook && <meta property="og:image" content={event.image_facebook} />}
            </Head>
            <div className={styles.eventImage} style={{ backgroundImage: `url(${event.image})` }} />
            <h1 className={styles.eventTitle} itemProp="name">
                {event.name}
            </h1>
            <meta itemProp="image" content={event.image} />
            <div className="prose max-w-none" itemProp="description">
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
            <EventPrice tickets={tickets} description={event.ticket_description} eventId={event.id} />
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps<EventPageProps, EventPageParams> = async function(context) {
    setContext(context.req);

    if (typeof context.params === 'undefined') {
        return {
            notFound: true
        };
    }

    const eventId = parseInt(context.params.id);

    const event = await api.event(eventId);

    if (event === null) {
        return {
            notFound: true
        };
    }

    const [activities, talks, discussions, tickets] = await Promise.all([
        api.eventActivities(eventId),
        api.talks({ event_id: eventId }),
        api.getDiscussions({ event_id: eventId }).catch(() => null),
        api.eventTickets(eventId).catch(() => null)
    ]);

    return {
        props: {
            event,
            activities,
            talks,
            discussions,
            tickets
        }
    };
};

export default EventPage;
