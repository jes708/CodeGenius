'use strict'

import React, { Component, PropTypes } from 'react'
import axios from 'axios';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { getAssessmentTeam } from '../actions/assessmentTeamActions'
import Toggle from 'material-ui/Toggle'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import StudentCard from './StudentCard'
import styles from './graderStyles'
import { checkForFork } from '../actions/githubActions'
import { getStudentTestInfo, getStudentTestsInfo, putStudentTestInfo } from '../actions/studentTestInfoActions'
import { getAssessmentStudentTests } from '../reducers/studentTestInfo'
import AssessmentCard from './AssessmentCard'

class GraderStudents extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      message: ''
    }

    this.handleSelectStudent = this.handleSelectStudent.bind(this)
    this.handleToggleStudent = this.handleToggleStudent.bind(this)
    this.handleRefreshStudent = this.handleRefreshStudent.bind(this)
    this.handleRefreshAllStudents = this.handleRefreshAllStudents.bind(this)
  }

  handleSelectStudent (studentId) {
    const { dispatch, assessment, switchTabs } = this.props
    dispatch(getStudentTestInfo(assessment.id, studentId))
    switchTabs('Panel')
  }

  handleToggleStudent (studentId, status) {
    const { dispatch, assessment } = this.props
    this.setState({ open: false })
    dispatch(putStudentTestInfo(assessment.id, studentId, {isStudent: status}, false))
  }

  handleRefreshStudent (studentTest) {
    const { dispatch } = this.props
    const { assessmentId, userId } = studentTest
    checkForFork(studentTest.basePath).then(result => {
      if (result.status !== 404) {
        this.setState({
          open: true,
          message: 'Fork was Found!'
        })
        dispatch(putStudentTestInfo(assessmentId, userId, { repoUrl: `https://github.com/${studentTest.basePath}` }, false))
      } else {
        this.setState({
          open: true,
          message: 'Fork was Not Found!'
        })
      }
    })
  }

  handleRefreshAllStudents () {
    const { studentTests } = this.props
    const studentTestNoForks = studentTests.filter(studentTest => !studentTest.repoUrl)
    studentTestNoForks.forEach(studentTest => this.handleRefreshStudent(studentTest))
  }

  renderMessage () {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        autoHideDuration={4000}
      />
    )
  }

  renderStudents () {
    const { isFetching, dispatch, studentTests } = this.props

    if (isFetching) {
      return (<div style={styles.center}><CircularProgress size={2} /></div>)
    } else {
      return (
        studentTests.sort(function(a,b) {
          if (a.user.name < b.user.name) return -1;
          else if (a.user.name > b.user.name) return 1;
          else return 0;
        }).map((studentTest, i) => {
          return (
            <StudentCard
              key={i}
              studentTest={studentTest}
              dispatch={dispatch}
              onSelect={this.handleSelectStudent}
              onToggle={this.handleToggleStudent}
              onRefresh={this.handleRefreshStudent}
            />
          )
        })
      )
    }
  }

  render () {
      return (
        <div style={Object.assign({}, styles.gradingPane, styles.paperStyle)}>
          <div style={styles.content}>
          <AssessmentCard
            {...this.props}
            refresh={this.handleRefreshAllStudents}
            showSubmit={true}
            editable={false}
          />
          {this.renderStudents()}
          {this.renderMessage()}
          </div>
        </div>
      )
  }
}

const mapStateToProps = state => {
  const { studentTestInfo, assessments } = state
  const { isFetching, byId } = studentTestInfo
  const currentAssessment = assessments.current.base

  return {
    isFetching,
    studentTests: getAssessmentStudentTests(byId, currentAssessment.id),
    assessment: currentAssessment
  }
}

export default connect(mapStateToProps)(GraderStudents)
