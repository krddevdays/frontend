import * as React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as ru from 'react-intl/locale-data/ru';
import App, { Container, NextAppContext } from 'next/app';
import NProgress from 'next-nprogress/component';
import './_app.css';
import Header from '../components/Header/Header';

type MyAppProps = {
    initialNow: number;
};

addLocaleData(ru);

class MyApp extends App<MyAppProps> {
    static async getInitialProps({ Component, ctx }: NextAppContext) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        const initialNow = Date.now();

        return { pageProps, initialNow };
    }

    render() {
        const { Component, pageProps, initialNow } = this.props;

        return (
            <IntlProvider locale="ru" initialNow={initialNow} timeZone="Europe/Moscow">
                <Container>
                    <NProgress />
                    <Header />
                    <main role="main">
                        <Component {...pageProps} />
                    </main>
                </Container>
            </IntlProvider>
        );
    }
}

export default MyApp;
