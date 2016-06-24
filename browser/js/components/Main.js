'use strict'

import React, { Component } from 'react'
import Navbar from './shared/Navbar'

export default class Main extends Component {
  render () {
    return (
      <div>
        <Navbar />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
