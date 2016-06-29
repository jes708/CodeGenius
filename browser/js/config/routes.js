'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/App'
import Home from '../containers/Home'
// import Grade from '../containers/Grade'
import {AnnotatedGrade as Grade} from '../containers/Grade'
import AuthForm from '../shared/AuthForm'
import TestAnnotate from '../components/Annotator/test.js'
import TestComponent from '../components/test/TestComponent'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/home' component={Home} />
    <Route path='grade' component={Grade} />
    <Route path='login' component={AuthForm} />
    <Route path='signup' component={AuthForm} />
    <Route path='/test/annotate' component={TestAnnotate} />
    <Route path='/test/component' component={TestComponent} />
  </Route>
)

export default routes
