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
import isEqual from 'lodash/lang/isEqual'

class GraderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      fileName: ''
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   const { oldStudentTest } = this.props
  //   if (!isEqual(oldStudentTest, nextProps.studentTest)) {
  //     this.setState({ open: true })
  //   }
  // }

  handleToggle () {
    this.setState({ open: !this.state.open })
  }

  handleFileSelect (filePath) {
    const { dispatch, assessment, studentTest } = this.props
    let basePath
    if (studentTest) {
      basePath = studentTest.basePath.split('/')
    } else {
      basePath = assessment.basePath.split('/')
    }
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
  const { github, assessments } = state
  const { current } = assessments
  return {
    contents: github.contents,
    assessment: current.base,
    studentTest: current.student
  }
}

export default connect(mapStateToProps)(GraderView)
