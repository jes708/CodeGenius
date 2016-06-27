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

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Grade', path: 'grade' },
  { label: 'Members Only', path: 'membersOnly', auth: true }
]


export default class Navbar extends Component {
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
