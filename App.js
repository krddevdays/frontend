import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { createApp, renderApp } from '@phenomic/preset-react-app/lib/client'
import { injectGlobal } from 'styled-components'

import Html from './Html'

// language=SCSS
injectGlobal`
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
  }
`

const routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={require('./components/Home/index').default} />
  </Router>
)

export default createApp(routes, Html)

if (module.hot) {
  module.hot.accept(() => renderApp(routes))
}
