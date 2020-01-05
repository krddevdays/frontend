import * as React from 'react';
import { NextPageContext, NextComponentType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import * as api from '../api';

import Container from '../components/Container/Container';
import EventsList from '../components/EventsList';
import { Event } from '../components/EventCard/EventCard';
import './index.css';

type IndexPageProps = {
    events: Event[];
};

const IndexPage: NextComponentType<NextPageContext, IndexPageProps, IndexPageProps> = props => {
    return (
        <React.Fragment>
            <Head>
                <title>Krasnodar Dev Days</title>
            </Head>
            <Container>
                <div className="index-header">
                    <h1 className="index-header__title">Независимое сообщество разработчиков Краснодара и края</h1>
                    <p className="index-header__description">
                        Создано, чтобы объединять, развивать и поддерживать всех, кто так или иначе причастен к
                        разработке.
                    </p>
                </div>
            </Container>
            {props.events.length > 0 && (
                <section className="index-section-background">
                    <Container className="section">
                        <h2 className="section__title">Предстоящие мероприятия</h2>
                        <Link href="/events">
                            <a className="section__action">Посмотреть все</a>
                        </Link>
                        <div className="section__content">
                            <EventsList events={props.events}/>
                        </div>
                    </Container>
                </section>
            )}
        </React.Fragment>
    );
};

export default IndexPage;

IndexPage.getInitialProps = async () => {
    const events = await api.events({
        date_from: new Date()
    }).then(events => events
        .sort((e1, e2) => (
            Date.parse(e1.finish_date) > Date.parse(e2.finish_date)
        ) ? 1 : -1)
    );

    return {
        events
    };
};
