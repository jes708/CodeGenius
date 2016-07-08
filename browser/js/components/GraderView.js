'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { PrismCode } from 'react-prism';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import SubGradeView from './SubGradeView'
import styles from './graderStyles'
import { getRepoContents } from '../actions/githubActions'

class GraderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      fileName: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const { fileName } = this.state
    const { dispatch } = nextProps
    if (nextProps.studentTest.basePath && fileName !== '' && (this.props.studentTest.userId !== nextProps.studentTest.userId)) {
      const basePath = nextProps.studentTest.basePath.split('/')
      dispatch(getRepoContents(basePath[0], basePath[1], fileName))
    }
  }

  handleToggle () {
    this.setState({ open: !this.state.open })
  }

  handleFileSelect (filePath) {
    const { dispatch, assessment, studentTest } = this.props
    let basePath
    if (studentTest.basePath) {
      basePath = studentTest.basePath.split('/')
    } else {
      basePath = assessment.solutionPath.split('/')
    }
    const user = basePath[0]
    const repo = basePath[1]
    this.setState({ fileName: filePath, open: !this.state.open })
    dispatch(getRepoContents(user, repo, filePath))
  }

  renderCodeView () {
    const { isFetchingRepoContent, contents, contentError } = this.props

    if (isFetchingRepoContent) {
      return (<div style={styles.center}><CircularProgress size={2} /></div>)
    }else if (contents || contentError.statusText) {
      return (
        <pre className='line-numbers language-javascript'>
          <PrismCode className='language-javascript'>
            {contentError && contentError.status ? `File ${contentError.statusText}` : contents || null}
          </PrismCode>
        </pre>
      )
    } else {
      return (
        <div style={Object.assign({}, styles.gradingTitle, { color: 'black' })}>No File Selected.</div>
      )
    }
  }

  render () {
    const { fileName, open } = this.state
    const { assessment } = this.props

    return (
      <Paper zDepth={2} style={styles.graderView}>
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
          {this.renderCodeView()}
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  const { github, assessments } = state
  const { current } = assessments
  return {
    isFetchingRepoContent: github.reposContent,
    contents: github.contents,
    contentError: github.error,
    assessment: current.base,
    studentTest: current.student
  }
}

export default connect(mapStateToProps)(GraderView)
