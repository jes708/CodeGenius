'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import getState from 'redux'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import { blue300 } from 'material-ui/styles/colors'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { AUTH_USER_REQUEST, logout, getLoggedInUser } from '../../actions/authActions'

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
  },
  home: {
    backgroundColor: blue300,
  }
}

const NAV_ITEMS = [
  { label: 'Home', path: '/', auth: true },
  { label: 'Grade', path: 'grade', auth: true },
  { label: 'Members Only', path: 'membersOnly', auth: true }
]

class Navbar extends Component {
  componentWillMount () {
    this.props.dispatch(getLoggedInUser())
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user) this.context.router.push('/grade')
  }

  handleLogout () {
    this.props.dispatch(logout())
    this.context.router.push('/')
  }

  renderNavItems () {
    return NAV_ITEMS.map((item, i) => {
      if (this.props.user || !item.auth) {
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
    if (this.props.user) {
      return (
        <ToolbarGroup style={styles.rightSide}>
          <Avatar src={this.props.user.photo } size={30} style={{alignSelf: 'center', marginRight: 10}} />
          <ToolbarTitle text={this.props.user.name} style={{paddingRight: 0}} />
          <RaisedButton
            label="Logout"
            primary={true}
            linkButton={true}
            onClick={this.handleLogout.bind(this)}
          />
        </ToolbarGroup>
      )
    } else {
      return (
        <ToolbarGroup style={styles.rightSide}>
          <RaisedButton
            label="Sign In"
            primary={true}
            href={'/auth/github'}
            linkButton={true}
            style={styles.shrinkMarginLeft}
          />
        </ToolbarGroup>
      )
    }
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

Navbar.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { session } = state
  return {
    user: session.user,
  }
}

export default connect(mapStateToProps)(Navbar)
