'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/App'
import Home from '../containers/Home'
// import Grade from '../containers/Grade'
import {AnnotatedGrade as Grade} from '../containers/Grade'
import TestAnnotate from '../components/Annotator/test.js'
import StudentView from '../components/StudentView'
import NotFound from '../shared/NotFound'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='grade' component={Grade} />
    <Route path='/test/annotate' component={TestAnnotate} />
    <Route path='/studenttest/:assessmentId/:studentTestId/:userId' component={StudentView} />
    <Route path='*' component={NotFound} />
  </Route>
);

export default routes;
