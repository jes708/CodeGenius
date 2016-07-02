'use strict'

import React, { Component } from 'react'
import { login } from '../../actions/AuthActions'
import { connect } from 'react-redux'
import GitHubButton from '../../shared/GitHubButton'

class Home extends Component {
  handleLogin () {
    this.props.dispatch(login())
  }

  render () {
    return (
      <div className='container'>
        <h1>Hello World!</h1>
        <GitHubButton onClick={this.handleLogin.bind(this)} />
      </div>
    )
  }
}

export default connect()(Home)
