'use strict'

import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'
import GradeView from '../components/GradeView'
import AuthForm from '../components/shared/AuthForm'
import {TestAnnotate as TestAnnotate} from '../components/Annotator'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='/home' component={Home} />
      <Route path='grade' component={GradeView} />
      <Route path='login' component={AuthForm} />
      <Route path='signup' component={AuthForm} />
    </Route>
    <Route path='/test' component={Main}>
      <Route path='annotate' component={TestAnnotate} />
    </Route>
  </Router>
)

export default routes
