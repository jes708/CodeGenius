'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { PrismCode } from 'react-prism';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import CircularProgress from 'material-ui/CircularProgress'
import SubGradeView from './SubGradeView'
import styles from './graderStyles'
import { getRepoContents } from '../actions/githubActions'

class GraderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      showSolution: false,
      fileName: ''
    }

    this.handleToggle = this.handleToggle.bind(this)
    this.handleToggleSolutionCode = this.handleToggleSolutionCode.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { fileName, showSolution } = this.state
    const { dispatch } = nextProps
    if (!showSolution
      && nextProps.studentTest.basePath
      && fileName !== ''
      && (this.props.studentTest.userId !== nextProps.studentTest.userId)) {
      const basePath = nextProps.studentTest.basePath.split('/')
      dispatch(getRepoContents(basePath[0], basePath[1], fileName))
    }
  }

  handleToggle () {
    this.setState({ open: !this.state.open })
  }

  handleToggleSolutionCode () {
    const { fileName } = this.state
    const { dispatch, assessment, studentTest } = this.props
    const solutionPath = assessment.solutionPath.split('/')
    this.setState({ showSolution: !this.state.showSolution })
    if (!this.state.showSolution) {
      dispatch(getRepoContents(solutionPath[0], solutionPath[1], fileName))
    } else if (studentTest.basePath) {
      const studentPath = studentTest.basePath.split('/')
      dispatch(getRepoContents(studentPath[0], studentPath[1], fileName))
    }
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
    const { fileName, open, showSolution } = this.state
    const { assessment } = this.props

    return (
      <Paper zDepth={2} style={styles.graderView}>
        <div style={styles.content}>
          <RaisedButton
            label={open ? 'Hide Files' : 'Show Files'}
            style={{marginBottom: '10'}}
            onTouchTap={this.handleToggle}
            primary={true}
          />
          <Toggle
            toggled={showSolution}
            onToggle={this.handleToggleSolutionCode}
            label={showSolution ? 'Hide Solution Code' : 'Show Solution Code'}
            labelPosition={'right'}
            labelStyle={{ display: 'inline-block', width: 'auto' }}
            style={{ width: 'auto' }}
            disabled={fileName === ''}
          />
          <SubGradeView
            open={this.state.open}
            files={assessment.solutionFiles || []}
            onSelect={this.handleFileSelect}
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
