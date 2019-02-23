import * as React from 'react';
import { IntlProvider, addLocaleData, LocaleData } from 'react-intl';
import App, { Container, NextAppContext } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import './_app.css';
import NavBar from '../components/NavBar/NavBar';
import Sidebar from '../components/Sidebar/Sidebar';
import * as http from 'http';

type MyAppProps = {
    locale: string;
    initialNow: number;
};

declare global {
    interface Window {
        ReactIntlLocaleData: {
            [key: string]: LocaleData;
        };
        __NEXT_DATA__: {
            props: MyAppProps;
        };
    }
}

if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
    Object.keys(window.ReactIntlLocaleData).forEach(lang => {
        addLocaleData(window.ReactIntlLocaleData[lang]);
    });
}

class MyApp extends App<MyAppProps> {
    static async getInitialProps({ Component, ctx }: NextAppContext) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        const { locale } = (ctx.req as http.IncomingMessage & MyAppProps) || window.__NEXT_DATA__.props;
        const initialNow = Date.now();

        return { pageProps, locale, initialNow };
    }

    render() {
        const { Component, pageProps, initialNow, locale } = this.props;

        return (
            <IntlProvider locale={locale} initialNow={initialNow} timeZone="Europe/Moscow">
                <Container>
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
