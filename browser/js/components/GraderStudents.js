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
      isRefreshing: false
    }

    this.handleRefreshStudent = this.handleRefreshStudent.bind(this)
  }

  handleSelectStudent (studentId) {
    const { dispatch, assessment, switchTabs } = this.props
    dispatch(getStudentTestInfo(assessment.id, studentId))
    switchTabs('Panel')
  }

  handleToggleStudent (studentId, status) {
    const { dispatch, assessment } = this.props
    dispatch(putStudentTestInfo(assessment.id, studentId, {isStudent: status}))
  }

  handleRefreshStudent (studentTest) {
    const { dispatch } = this.props
    const { assessmentId, studentId } = studentTest
    this.setState({ isRefreshing: true })
    checkForFork(studentTest.basePath).then(result => {
      console.log(result)
      this.setState({ isRefreshing: false })
      // dispatch(putStudentTestInfo(assessmentId, studentId, { repoUrl: `https://github.com/${studentTest.basePath}` }))
    })
  }

  renderStudents () {
    const { isFetching, dispatch, studentTests } = this.props

    if (isFetching) {
      return (<h1 style={{textAlign: 'center'}}>Loading...</h1>)
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
              onSelect={this.handleSelectStudent.bind(this)}
              onToggle={this.handleToggleStudent.bind(this)}
              onRefresh={this.handleRefreshStudent}
            />
          )
        })
      )
    }
  }

  render () {
      return (
        <div style={Object.assign(styles.gradingPane, styles.paperStyle)}>
          <div style={styles.content}>
          <AssessmentCard
            assessment={this.props.assessment}
            editable={false}
            student={true}
            />
            {this.renderStudents()}
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
