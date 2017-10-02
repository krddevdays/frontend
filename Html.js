import React from 'react'
import PropTypes from 'prop-types'
import Head from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'

const Html = ({ App, render }) => {
  const sheet = new ServerStyleSheet()
  const { Main, State, Script } = render(sheet.collectStyles(<App />))
  const helmet = Head.renderStatic()

  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {sheet.getStyleElement()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{ __html: `(window.Image ? (new Image()) : document.createElement('img')).src = 'https://vk.com/rtrg?p=VK-RTRG-140553-fXIvj';` }} />
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        <Main />
        <State />
        <Script />
        <script type='text/javascript' dangerouslySetInnerHTML={{
          __html: `
        (function (d, w, c) {
          (w[c] = w[c] || []).push(function() {
            try {
              w.yaCounter44994376 = new Ya.Metrika({
                id:44994376,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                trackHash:true
              });
            } catch(e) { }
          });

          var n = d.getElementsByTagName('script')[0],
          s = d.createElement('script'),
          f = function () { n.parentNode.insertBefore(s, n); };
          s.type = 'text/javascript';
          s.async = true;
          s.src = 'https://mc.yandex.ru/metrika/watch.js';

          if (w.opera == '[object Opera]') {
          d.addEventListener('DOMContentLoaded', f, false);
        } else { f(); }
        })(document, window, 'yandex_metrika_callbacks');
        `
        }} />
        <script type='text/javascript' dangerouslySetInnerHTML={{
          __html: `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1948331748778465'); // Insert your pixel ID here.
        fbq('track', 'PageView');
        `
        }} />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <img height='1' width='1' style='display:none' src='https://www.facebook.com/tr?id=1948331748778465&ev=PageView&noscript=1'/>
          `
          }} />
        <noscript
          dangerouslySetInnerHTML={{ __html: `<img src='https://mc.yandex.ru/watch/44994376' style='position: absolute; left: -9999px' alt='' />` }} />
      </body>
    </html>
  )
}
Html.propTypes = {
  App: PropTypes.any.isRequired,
  render: PropTypes.func.isRequired
}

export default Html
