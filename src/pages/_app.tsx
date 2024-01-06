import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { AppProps } from 'next/app';
import Script from 'next/script';
import '@/styles/Global.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Router from 'next/router';
import { stripIndent } from 'common-tags';
import ReactModal from 'react-modal';
import AuthProvider from '@/components/AuthProvider';

import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

ReactModal.setAppElement('#__next');

Router.events.on('routeChangeComplete', (url: string) => {
    ym(53951545, 'hit', url);
    _tmr.push({ type: 'pageView' });
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
                    id="vk-ads-pixel"
                    dangerouslySetInnerHTML={{
                        __html: stripIndent`
                        var _tmr = _tmr || (_tmr = []);
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
                <Script
                    id="ym-counter"
                    dangerouslySetInnerHTML={{
                        __html: stripIndent`
                       (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                       m[i].l=1*new Date();
                       for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                       k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                       (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                    
                       ym(53951545, "init", {
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true,
                            webvisor:true
                       });
                    `,
                    }}
                />
                {getLayout(<Component {...pageProps} />)}
            </AuthProvider>
        </IntlProvider>
    );
}
