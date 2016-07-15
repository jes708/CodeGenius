'use strict'

import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { createDemoAssessment } from '../../actions/assessmentActions'

const styles = {
  transparent: {
    backgroundColor: 'transparent'
  },
  invert: {
    backgroundColor: 'white',
    color: 'black'
  }
} 

export default class GitHubInvert extends Component {

  render () {
    return (
      <RaisedButton
        style={Object.assign({}, styles.transparent, styles.invert)}
        label={this.props.label || "Sign In with Github"}
        linkButton={true}
        // onClick={this.handleClick}
        href={this.props.href}
        icon={<FontIcon className="fa fa-github" />}
      />
    )
  }
}

GitHubInvert.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string.isRequired
}
