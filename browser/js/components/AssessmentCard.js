'use strict'

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import AssessmentForm from './AssessmentForm'
import styles from './graderStyles'
import { Card, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const AssessmentCard = ({assessment, editable, student, prev, next }) => {

  const renderEdit = () => {
    if (this.props.editable) {
      return(
        <IconButton
          style={{ float: 'right' }}
          iconStyle={{ color: '#fff' }}
          iconClassName={'fa fa-pencil'}
          tooltip='Edit Assessment'
          onTouchTap={() => onEdit(assessment)}
        />
      )
    }
  }

  const renderStudent = () => {   
    return (
      <div>
      <div style={Object.assign({}, styles.gradingSubtitle, styles.studentCardSelect)}>
        <img src={this.props.student.user.photo} alt={this.props.student.user.name} style={styles.student} />
        {this.props.student.user.name}
      </div>
      <CardActions>
        <FlatButton
          label='Previous Student'
          onClick={this.handleStudentShift.bind(this, "prev")}
          hoverColor={'#2196F3'}
          rippleColor={'#90CAF9'}
          style={{color: '#F5F5F5'}}
        />
        <FlatButton
          label='Next Student'
          onClick={this.handleStudentShift.bind(this, "next")}
          hoverColor={'#2196F3'}
          rippleColor={'#90CAF9'}
          style={{color: '#F5F5F5'}}
        />
      </CardActions>
      </div>
    )
  }

    const { assessment, onSelect, onEdit } = this.props

    return (
      <Paper style={Object.assign({}, styles.assessmentInfo, styles.skinny)}>
        <div>
          <div onTouchTap={() => onSelect(assessment.id)}
            style={Object.assign({}, styles.editAssessment, styles.gradingTitle)}>
            {assessment.name}
          </div>
          {this.renderEdit()}
        </div>
        <div style={styles.gradingSubtitle}>{`Team: ${assessment.team.name}`}</div>
        <a href="#" style={styles.gradingSubtitle}>{assessment.repoUrl}</a>
      </Paper>
    )

}

AssessmentCard.propTypes = {
  assessment: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func
}

export default AssessmentCard
