'use strict'

import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from '../containers/App'
import Home from '../containers/Home'
import Grade from '../containers/Grade'
import AuthForm from '../shared/AuthForm'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/home' component={Home} />
      <Route path='grade' component={Grade} />
      <Route path='login' component={AuthForm} />
      <Route path='signup' component={AuthForm} />
    </Route>
  </Router>
)

export default routes
