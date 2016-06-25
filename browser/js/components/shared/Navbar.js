'use strict'

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
require('./Navbar.scss')

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { label: 'Home', path: '/' },
        { label: 'About', path: 'about' },
        { label: 'Members Only', path: 'membersOnly', auth: true }
      ]
    }
  }

  renderNavItems () {
    return this.state.items.map((item, i) => {
      if (!item.auth) {
        return (
          <li key={i}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        )
      }
    })
  }

  render () {
    return (
      <nav className="navbar navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <img className='fullstack-logo' src="https://jlau-bucket-1.s3.amazonaws.com/uploads/topic/image/42/fullstack.png" />
          </div>
          <ul className="nav navbar-nav">
            {this.renderNavItems()}
          </ul>
          <button className="btn login-button">Login</button>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {

}
