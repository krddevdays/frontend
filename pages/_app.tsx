import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { AppProps } from 'next/app';
import '../styles/Global.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ym, { YMInitializer } from 'react-yandex-metrika';
import Router from 'next/router';
import Head from 'next/head';
import { stripIndent } from 'common-tags';
import ReactModal from 'react-modal';
import AuthProvider from '../components/AuthProvider';

import * as vk from '../features/vk';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

ReactModal.setAppElement('#__next');

Router.events.on('routeChangeComplete', (url: string) => {
    ym('hit', url);

    vk.hit();
});

type GetLayout = (page: ReactElement) => ReactNode;

export type NextPageWithLayout = NextPage & {
    getLayout?: GetLayout
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function DefaultLayout(page: ReactElement) {
    return (
        <>
            <Header />
            <main role='main'>
                {page}
            </main>
            <Footer />
        </>
    );
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? DefaultLayout;

    return (
        <IntlProvider locale='ru' timeZone='Europe/Moscow'>
            <AuthProvider>
                <Head>
                    <script
                        key='plugin-vk-pixel'
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
                    version='2'
                >
                    <noscript
                        key='plugin-vk-pixel'
                        dangerouslySetInnerHTML={{
                            __html: stripIndent`
                                <img src='https://vk.com/rtrg?p=VK-RTRG-383749-dV7bo' style='position:fixed; left:-999px;' alt=''/>`
                        }}
                    />
                    <noscript>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src='https://mc.yandex.ru/watch/53951545'
                            style={{
                                position: 'absolute',
                                left: '-9999px'
                            }}
                            alt=''
                        />
                    </noscript>
                </YMInitializer>
                {getLayout(<Component {...pageProps} />)}
            </AuthProvider>
        </IntlProvider>
    );
}
