'use strict'

import React, { Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { grey900, amber700 } from 'material-ui/styles/colors'
import Navbar from '../../shared/Navbar'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900,
    accent1Color: amber700
  }
})

export default class App extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Navbar />
          <div style={{marginTop: 20}}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
