'use strict'

import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

export default class GitHubButton extends Component {
  render () {
    return (
      <RaisedButton
        label={this.props.label || "Sign In with Github"}
        linkButton={true}
        href={this.props.href}
        primary={true}
        icon={<FontIcon className="fa fa-github" />}
      />
    )
  }
}

GitHubButton.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string.isRequired
}
