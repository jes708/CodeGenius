'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import getState from 'redux'
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

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Grade', path: 'grade' },
  { label: 'Members Only', path: 'membersOnly', auth: true }
]

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user) {
      console.log('from Navbar')
      console.log(nextProps.user)
    }
  }

  renderNavItems () {
    return NAV_ITEMS.map((item, i) => {
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

  renderAuthButtons () {
    return (
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
    )
  }

  render () {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text='CodeGenius' style={styles.growMarginRight} />
          {this.renderNavItems()}
        </ToolbarGroup>
        {this.renderAuthButtons()}
      </Toolbar>
    )
  }
}

const mapStateToProps = state => {
  const { session } = state
  return {
    user: session.user
  }
}

export default connect(mapStateToProps)(Navbar)
