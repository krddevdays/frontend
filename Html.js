import React from 'react'
import PropTypes from 'prop-types'
import Head from 'react-helmet'

const Html = (props) => {
  const helmet = Head.renderStatic()

  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {typeof window === 'undefined' && require('./ServerStyleSheet').default.getStyleElement()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        {props.body}
        {props.state}
        {props.script}
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

          var n = d.getElementsByTagName("script")[0],
          s = d.createElement("script"),
          f = function () { n.parentNode.insertBefore(s, n); };
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://mc.yandex.ru/metrika/watch.js";

          if (w.opera == "[object Opera]") {
          d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
        })(document, window, "yandex_metrika_callbacks");
        `
        }} />
        <noscript
          dangerouslySetInnerHTML={{__html: `<img src='https://mc.yandex.ru/watch/44994376' style={{position: 'absolute', left: '-9999px'}} alt='' />`}} />
      </body>
    </html>
  )
}

Html.propTypes = {
  body: PropTypes.any,
  state: PropTypes.any,
  script: PropTypes.any
}

export default Html
