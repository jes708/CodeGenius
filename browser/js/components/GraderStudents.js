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
import { getStudentTestInfo, getStudentTestsInfo, putStudentTestInfo } from '../actions/studentTestInfoActions'
import { getAllStudentTests, getStudentTestFor } from '../reducers/studentTestInfo'

const SAMPLE_SPEC = {
  "Fake Library App": [
    "static files (from the static folder in the public folder) on /files route",
    "handles internal server errors",
    "handles custom errors",
  ],
  "Fake Library App /api/books": [
    "GET all",
    "POST one"
  ]
}

class GraderStudents extends Component {

  // componentWillMount () {
  //   this.props.dispatch(getAssessmentTeam(1))
  // }

  //TODO do not hard-code assessmentId 
  componentWillMount () {
    const { dispatch, assessment } = this.props
    dispatch(getStudentTestsInfo(assessment.id))
  }

  handleSelectStudent (studentId) {
    const { dispatch, assessment, switchTabs } = this.props
    dispatch(getStudentTestInfo(assessment.id, studentId))
    switchTabs('Panel')
  }

  renderStudents () {
    // if (!this.props.teamFetching && this.props.team) {
      let studentTests = this.props.studentTestInfo;
      studentTests = studentTests.sort(function(a,b) {
        if (a.user.name < b.user.name) return -1;
        else if (a.user.name > b.user.name) return 1;
        else return 0;
      })
      return studentTests.map((studentTest, i) => {
        return (
          <StudentCard
            key={i}
            studentTest={studentTest}
            onSelect={this.handleSelectStudent.bind(this)}
          />
        )
      })
    // }
  }

  render () {
    // if (this.props.teamFetching && !this.props.team) {
    //   return <h1>Loading...</h1>
    // } else {

      return (
        <div style={Object.assign(styles.gradingPane, styles.paperStyle)}>
          <div style={styles.content}>
            {this.renderStudents()}
          </div>
        </div>
      )
    // }
  }
}

// const mapStateToProps = state => {
//   const { assessmentTeam } = state
//   const { teamFetching, team } = assessmentTeam
//   return {
//     teamFetching,
//     team
//   }
// }

const mapStateToProps = state => {
  const { studentTestInfo, assessments } = state
  const { isFetching } = studentTestInfo
  return {
    isFetching,
    studentTestInfo: getAllStudentTests(studentTestInfo.byId),
    assessment: assessments.current.base

  }
}

export default connect(mapStateToProps)(GraderStudents)
