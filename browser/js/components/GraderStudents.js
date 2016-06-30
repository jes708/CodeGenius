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
import IsStudent from './IsStudent'
import styles from './graderStyles'

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

  componentWillMount () {
    this.props.dispatch(getAssessmentTeam(1))
  }

  renderStudents () {
    if (!this.props.teamFetching && this.props.team) {
      console.log("props", this.props)
      return this.props.team.students.map((student, i) => {
        return (
          <StudentCard key={i} student={student}/>
        )
      })
    }
  }

  render () {
    if (this.props.teamFetching && !this.props.team) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div style={Object.assign(styles.gradingPane, styles.paperStyle)}>
          <div style={styles.content}>
            {this.renderStudents()}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  const { assessmentTeam } = state
  const { teamFetching, team } = assessmentTeam
  return {
    teamFetching,
    team
  }
}

export default connect(mapStateToProps)(GraderStudents)
