'use strict'

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import AssessmentForm from './AssessmentForm'
import styles from './graderStyles'

class AssessmentCard extends Component {

  render () {
    const { assessment, onSelect, onEdit } = this.props

    return (
      <Paper style={Object.assign({}, styles.assessmentInfo, styles.skinny)}>
        <div>
          <div onTouchTap={() => onSelect(assessment.id)}
            style={Object.assign({}, styles.editAssessment, styles.gradingTitle)}>
            {assessment.name}
          </div>
          <IconButton
            style={{ float: 'right' }}
            iconStyle={{ color: '#fff' }}
            iconClassName={'fa fa-pencil'}
            tooltip='Edit Assessment'
            onTouchTap={() => onEdit(assessment)}
          />
        </div>
        <div style={styles.gradingSubtitle}>{`Team: ${assessment.team.name}`}</div>
        <a href="#" style={styles.gradingSubtitle}>{assessment.repoUrl}</a>
      </Paper>
    )
  }
}

AssessmentCard.propTypes = {
  assessment: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func
}

export default AssessmentCard