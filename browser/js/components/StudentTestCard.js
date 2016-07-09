'use strict'

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import AssessmentForm from './AssessmentForm'
import styles from './graderStyles'
import { getStudentTestInfo, putStudentTestInfo } from '../actions/studentTestInfoActions'
import { CardActions } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import { green500 } from 'material-ui/styles/colors'


class StudentTestCard extends Component {

  renderStudentInfo() {
    const { score } = this.props
    if (score) {
        return (
          <div style={Object.assign({}, styles.gradingSubtitle, styles.studentCardSelect, styles.fullWidth)}>
            <p style={{marginTop: '15px'}}>Total Score: <span style={{fontWeight: 600}}>{score}</span></p>
          </div>
        )
    }
  }


  renderEditAssessment() {
    const { assessment } = this.props
    return (
      <div
      style={Object.assign({}, styles.editAssessment, styles.gradingTitle)}>
      {assessment.name}
      </div>
    )
  }

  render () {
    return (
      <Paper style={Object.assign({}, styles.assessmentInfo, styles.skinny)}>
        <div>
          {this.renderEditAssessment()}
        </div>
          {this.renderStudentInfo()}
      </Paper>
    )
  }
}

StudentTestCard.propTypes = {
  assessment: PropTypes.object.isRequired,
}

export default StudentTestCard
