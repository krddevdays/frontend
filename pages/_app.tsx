import * as React from 'react';
import { IntlProvider } from 'react-intl';
import App, { AppContext, Container } from 'next/app';
import NProgress from 'next-nprogress/component';
import './_app.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import sentry from '../server/sentry';
import { BrowserClient } from '@sentry/browser';
import ym, { YMInitializer } from 'react-yandex-metrika';
import Router from 'next/router';
import Head from 'next/head';
import { stripIndent } from 'common-tags';
import ReactModal from 'react-modal';
import AuthProvider from '../components/AuthProvider';

ReactModal.setAppElement('#__next');

declare global {
    interface Window {
        VK: any;
    }
}

Router.events.on('routeChangeComplete', (url: string) => {
    ym('hit', url);

    if (
        window &&
        typeof window.VK !== 'undefined' &&
        typeof window.VK.Retargeting !== 'undefined' &&
        typeof window.VK.Retargeting.Hit === 'function'
    ) {
        window.VK.Retargeting.Hit();
    }

    if (process.env.NODE_ENV !== 'production') {
        const els = document.querySelectorAll<HTMLLinkElement>('link[href*="/_next/static/css/styles.chunk.css"]');
        const timestamp = new Date().valueOf();
        if (els.length) {
            els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
        }
    }
});

const { Sentry, captureException } = sentry();

type ErrorState =
    | {
          hasError: true;
          errorEventId: string;
      }
    | {
          hasError: false;
          errorEventId: undefined;
      };

type MyAppProps = ErrorState;
type MyAppState = ErrorState;

class MyApp extends App<MyAppProps, MyAppProps> {
    static async getInitialProps({ Component, ctx }: AppContext) {
        let pageProps = {};
        let hasError = false;
        let errorEventId;

        try {
            if (Component.getInitialProps) {
                pageProps = await Component.getInitialProps(ctx);
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw error;
            }

            if (process.env.NODE_ENV === 'production') {
                hasError = true;
                errorEventId = captureException(error, ctx);
            } else {
                throw error;
            }
        }

        return { pageProps, hasError, errorEventId };
    }

    static getDerivedStateFromProps(props: MyAppProps, state: MyAppState) {
        // If there was an error generated within getInitialProps, and we haven't
        // yet seen an error, we add it to this.state here
        return {
            hasError: props.hasError || state.hasError || false,
            errorEventId: props.errorEventId || state.errorEventId || undefined
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        const errorEventId = captureException(error, { errorInfo });

        this.setState({ errorEventId });
    }

    state = {
        hasError: false as false,
        errorEventId: undefined
    };

    render() {
        const { Component, pageProps } = this.props;

        return (
            <IntlProvider locale="ru" timeZone="Europe/Moscow">
                <AuthProvider>
                    <Container>
                        <Head>
                            <script
                                key="plugin-vk-pixel"
                                dangerouslySetInnerHTML={{
                                    __html: stripIndent`
                                !function(){var t=document.createElement("script");t.type="text/javascript",
                                t.async=!0,t.src="https://vk.com/js/api/openapi.js?154",t.onload=function()
                                {VK.Retargeting.Init("VK-RTRG-383749-dV7bo"),VK.Retargeting.Hit()},
                                document.head.appendChild(t)}();`
                                }}
                            />
                        </Head>
                        <YMInitializer
                            accounts={[53951545]}
                            options={{
                                clickmap: true,
                                trackLinks: true,
                                accurateTrackBounce: true,
                                webvisor: true
                            }}
                            version="2"
                        >
                            <noscript
                                key="plugin-vk-pixel"
                                dangerouslySetInnerHTML={{
                                    __html: stripIndent`
                                <img src="https://vk.com/rtrg?p=VK-RTRG-383749-dV7bo" style="position:fixed; left:-999px;" alt=""/>`
                                }}
                            />
                            <noscript>
                                <img
                                    src="https://mc.yandex.ru/watch/53951545"
                                    style={{
                                        position: 'absolute',
                                        left: '-9999px'
                                    }}
                                    alt=""
                                />
                            </noscript>
                        </YMInitializer>
                        <NProgress />
                        <Header />
                        <main role="main">
                            {this.state.hasError ? (
                                <div style={{ textAlign: 'center' }}>
                                    <h1>Что-то пошло не так</h1>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            // @ts-ignore
                                            (Sentry as BrowserClient).showReportDialog({
                                                eventId: this.state.errorEventId
                                            })
                                        }
                                    >
                                        📣 Сообщить об ошибке
                                    </button>
                                </div>
                            ) : (
                                <Component {...pageProps} />
                            )}
                        </main>
                        <Footer />
                    </Container>
                </AuthProvider>
            </IntlProvider>
        );
    }
}

export default MyApp;
