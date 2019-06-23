import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';
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

const IndexPage: NextFunctionComponent<IndexPageProps, IndexPageProps, NextContext> = props => {
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
                        <h2 className="section__title">Мероприятия</h2>
                        <Link href="/events">
                            <a className="section__action">Посмотреть все</a>
                        </Link>
                        <div className="section__content">
                            <EventsList events={props.events} />
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
    });

    return {
        events
    };
};
