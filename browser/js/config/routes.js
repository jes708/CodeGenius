'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/App'
import Home from '../containers/Home'
// import Grade from '../containers/Grade'
import Grade from '../containers/Grade'
import NotFound from '../shared/NotFound'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='grade' component={Grade} />
    <Route path='*' component={NotFound} />
  </Route>
);

export default routes;

