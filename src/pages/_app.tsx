import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { AppProps } from 'next/app';
import Script from 'next/script';
import '@/styles/Global.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ym, { YMInitializer } from 'react-yandex-metrika';
import Router from 'next/router';
import { stripIndent } from 'common-tags';
import ReactModal from 'react-modal';
import AuthProvider from '@/components/AuthProvider';

import * as vk from '@/features/vk/vk';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

ReactModal.setAppElement('#__next');

Router.events.on('routeChangeComplete', (url: string) => {
    ym('hit', url);
    window._tmr.push({ type: 'pageView' });

    vk.hit();
});

type GetLayout = (page: ReactElement) => ReactNode;

export type NextPageWithLayout = NextPage & {
    getLayout?: GetLayout;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function DefaultLayout(page: ReactElement) {
    return (
        <>
            <Header />
            <main role="main">{page}</main>
            <Footer />
        </>
    );
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? DefaultLayout;

    return (
        <IntlProvider locale="ru" timeZone="Europe/Moscow">
            <AuthProvider>
                <Script
                    id="plugin-vk-pixel"
                    dangerouslySetInnerHTML={{
                        __html: stripIndent`
                                !function(){var t=document.createElement("script");t.type="text/javascript",
                                t.async=!0,t.src="https://vk.com/js/api/openapi.js?154",t.onload=function()
                                {VK.Retargeting.Init("VK-RTRG-383749-dV7bo"),VK.Retargeting.Hit()},
                                document.head.appendChild(t)}();`,
                    }}
                />
                <Script
                    id="plugin-vk-ads-pixel"
                    dangerouslySetInnerHTML={{
                        __html: stripIndent`
                        var _tmr = window._tmr || (window._tmr = []);
                        _tmr.push({id: "3469783", type: "pageView", start: (new Date()).getTime()});
                        (function (d, w, id) {
                          if (d.getElementById(id)) return;
                          var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
                          ts.src = "https://top-fwz1.mail.ru/js/code.js";
                          var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
                          if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
                        })(document, window, "tmr-code");
                        `,
                    }}
                />
                <YMInitializer
                    accounts={[53951545]}
                    options={{
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true,
                    }}
                    version="2"
                />
                {getLayout(<Component {...pageProps} />)}
            </AuthProvider>
        </IntlProvider>
    );
}
