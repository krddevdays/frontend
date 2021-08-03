import * as React from 'react';
import { IntlProvider } from 'react-intl';
import App from 'next/app';
import '../styles/Global.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
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
});

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <IntlProvider locale="ru" timeZone="Europe/Moscow">
                <AuthProvider>
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
                                <img src='https://vk.com/rtrg?p=VK-RTRG-383749-dV7bo' style='position:fixed; left:-999px;' alt=''/>`
                            }}
                        />
                        <noscript>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
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
                    <Header />
                    <main role="main">
                        <Component {...pageProps} />
                    </main>
                    <Footer />
                </AuthProvider>
            </IntlProvider>
        );
    }
}

export default MyApp;
