'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getState from 'redux'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import { blue300 } from 'material-ui/styles/colors'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { AUTH_USER_REQUEST, logout, getLoggedInUser } from '../../actions/AuthActions'

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
  { label: 'Grade', path: '/grade', auth: true }
]

class Navbar extends Component {
  componentWillMount () {
    const { user, dispatch, pathname } = this.props

    console.log(pathname)

    if (!user) {
      dispatch(getLoggedInUser(pathname))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { user, pathname, dispatch } = nextProps

    if (user && pathname === '/') dispatch(push('/grade'))
  }

  handleLogout () {
    this.props.dispatch(logout())
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
  const { session, routing } = state
  return {
    user: session.user,
    pathname: routing.locationBeforeTransitions.pathname
  }
}

export default connect(mapStateToProps)(Navbar)
