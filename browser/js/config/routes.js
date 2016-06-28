'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/App'
import Home from '../containers/Home'
import Grade from '../containers/Grade'
import AuthForm from '../shared/AuthForm'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/home' component={Home} />
    <Route path='grade' component={Grade} />
    <Route path='login' component={AuthForm} />
    <Route path='signup' component={AuthForm} />
  </Route>
)

export default routes
