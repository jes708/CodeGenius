'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { PrismCode } from 'react-prism';
import Paper from 'material-ui/Paper'
import styles from './graderStyles'

class GraderView extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
       <Paper zDepth={2} style={styles.paperStyle}>
        <div style={styles.content}>
          <h2 style={styles.skinny}>/models/article.js</h2>
          <pre className='line-numbers language-javascript'>
            <PrismCode className='language-javascript'>
            </PrismCode>
          </pre>
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  const { github } = state
  return {
    contents: github.contents
  }
}

export default connect(mapStateToProps)(GraderView)
