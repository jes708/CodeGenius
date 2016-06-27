'use strict'

import React, { Component } from 'react'
import { render }  from 'react-dom'
import routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

render(routes, document.getElementById('app'))
