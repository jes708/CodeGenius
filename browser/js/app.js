'use strict'

import React, { Component } from 'react'
import ReactDOM  from 'react-dom'
import routes from './config/routes'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

ReactDOM.render(routes, document.getElementById('main'))
