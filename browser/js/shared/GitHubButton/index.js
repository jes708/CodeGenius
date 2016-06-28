'use strict'

import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

const styles = {
  fullWidth: {
    width: '100%'
  }
}

export default class GitHubButton extends Component {
  render () {
    return (
      <div style={styles.fullWidth}>
        <RaisedButton
          label={this.props.label || "Sign Up with Github"}
          linkButton={true}
          href={this.props.href}
          primary={true}
          style={styles.fullWidth}
          icon={<FontIcon className="fa fa-github" />}
        />
      </div>
    )
  }
}

GitHubButton.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string.isRequired
}
