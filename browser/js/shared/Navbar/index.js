'use strict'

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

const styles = {
  shrinkMarginLeft: {
    marginLeft: -8,
    marginRight: 0
  },
  fullHeightButton: {
    margin: 0,
    lineHeight: '56px',
    height: '100%'
  },
  growMarginRight: {
    marginRight: 8
  }
}

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { label: 'Home', path: '/' },
        { label: 'Grade', path: 'grade' },
        { label: 'Members Only', path: 'membersOnly', auth: true }
      ]
    }
  }

  renderNavItems () {
    return this.state.items.map((item, i) => {
      if (!item.auth) {
        return (
          <FlatButton
            key={i}
            label={item.label}
            containerElement={<Link to={item.path} />}
            style={styles.fullHeightButton}
          />
        )
      }
    })
  }

  render () {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text='CodeGenius' style={styles.growMarginRight} />
          {this.renderNavItems()}
        </ToolbarGroup>
        <ToolbarGroup style={styles.rightSide}>
          <RaisedButton
            label="Login"
            primary={true}
            linkButton={true}
            containerElement={<Link to='login' />}
          />
          <RaisedButton
            label="Sign Up"
            secondary={true}
            linkButton={true}
            containerElement={<Link to='signup' />}
            style={styles.shrinkMarginLeft}
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

      // <nav className="navbar navbar-static-top">
      //   <div className="container">
      //     <div className="navbar-header">
      //       <img className='fullstack-logo' src="img/icon.png" />
      //     </div>
      //     <ul className="nav navbar-nav">
      //       {this.renderNavItems()}
      //     </ul>
      //     <Link to='signup' className="btn login-button">Sign Up</Link>
      //     <Link to='login' className="btn login-button">Login</Link>
      //   </div>
      // </nav>
// <img className='fullstack-logo' src="https://jlau-bucket-1.s3.amazonaws.com/uploads/topic/image/42/fullstack.png" />
Navbar.propTypes = {
}

