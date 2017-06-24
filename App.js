import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { createApp, renderApp } from '@phenomic/preset-react-app/lib/client'
import { injectGlobal } from 'styled-components'

import './font'
import Html from './Html'

// language=SCSS
injectGlobal`
  html {
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 100%;
    line-height: 1.15;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  html.wf-active {
    font-family: "Source Sans Pro", sans-serif;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  html.wf-active button,
  html.wf-active input,
  html.wf-active optgroup,
  html.wf-active select,
  html.wf-active textarea {
    font-family: "Source Sans Pro", sans-serif;
  }

  pre {
    font-family: monospace;
    font-size: 1em;
  }

  body {
    margin: 0;
  }

  html,
  body {
    height: 100%;
  }

  #PhenomicRoot {
    display: flex;
    min-height: 100%;
    flex-direction: column;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`

const routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={require('./components/2017').default} />
    <Route path='/2016' component={require('./components/2016').default} />
  </Router>
)

export default createApp(routes, Html)

if (module.hot) {
  module.hot.accept(() => renderApp(routes))
}
