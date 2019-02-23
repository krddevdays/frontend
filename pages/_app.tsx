import * as React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as ru from 'react-intl/locale-data/ru';
import App, { Container, NextAppContext } from 'next/app';
import NProgress from "next-nprogress/component";
import 'bootstrap/dist/css/bootstrap.css';
import './_app.css';
import NavBar from '../components/NavBar/NavBar';
import Sidebar from '../components/Sidebar/Sidebar';

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
            <IntlProvider locale='ru' initialNow={initialNow} timeZone="Europe/Moscow">
                <Container>
                    <NProgress />
                    <NavBar />
                    <div className="container-fluid">
                        <div className="row">
                            <Sidebar />
                            <main role="main" className="col-md-9 ml-sm-auto col-xl-10 px-4">
                                <Component {...pageProps} />
                            </main>
                        </div>
                    </div>
                </Container>
            </IntlProvider>
        );
    }
}

export default MyApp;
