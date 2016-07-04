'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { PrismCode } from 'react-prism';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './graderStyles'
import SubGradeView from './SubGradeView'
import { getAssessment } from '../actions/assessmentActions'
import { getRepoContents } from '../actions/githubActions'

class GraderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      fileName: ''
    }
  }

  handleToggle () {
    this.setState({ open: !this.state.open })
  }

  handleFileSelect (filePath) {
    const { dispatch, assessment } = this.props
    const basePath = assessment.basePath.split('/')
    const user = basePath[0]
    const repo = basePath[1]
    this.setState({ fileName: filePath })
    dispatch(getRepoContents(user, repo, filePath))
  }

  render () {
    const { fileName, open } = this.state
    const { contents, assessment } = this.props

    return (
      <Paper zDepth={2} style={styles.paperStyle}>
        <div style={styles.content}>
          <RaisedButton
            label={open ? 'Hide Files' : 'Show Files'}
            style={{marginBottom: '10'}}
            onTouchTap={this.handleToggle.bind(this)}
            primary={true}
          />
          <SubGradeView
            open={this.state.open}
            files={assessment.solutionFiles || []}
            onSelect={this.handleFileSelect.bind(this)}
          />
          <h2 style={styles.skinny}>{fileName}</h2>
          <pre className='line-numbers language-javascript'>
            <PrismCode className='language-javascript'>
              {contents || null}
            </PrismCode>
          </pre>
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  const { github, assessments, studentTest } = state
  const { current } = assessments
  return {
    contents: github.contents,
    assessment: current.base,
    studentTest
  }
}

export default connect(mapStateToProps)(GraderView)