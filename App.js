import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { createApp, renderApp } from '@phenomic/preset-react-app/lib/client'
import Html from './Html'

import './defaults.css'

const routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ require('./components/Home/index').default } />
  </Router>
)

export default createApp(routes, Html)

if (module.hot) {
  module.hot.accept(() => renderApp(routes))
}