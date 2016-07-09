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


class AssessmentCard extends Component {

  handleStudentShift(direction) {
    const { assessment, dispatch, student, studentTests } = this.props

    let currentId = String(student.id);
    
    let actualStudentsTests = [];
    for (let testId in studentTests) {
      if (studentTests[testId].isStudent && studentTests[testId].repoUrl) actualStudentsTests.push(testId)
    }

    if (actualStudentsTests.length < 2) return;
 
    let currentIndex = actualStudentsTests.indexOf(currentId);
    let newIndex;

    if (direction === "prev") {
      if (currentIndex < 1) newIndex = actualStudentsTests.length - 1;
      else newIndex = currentIndex - 1;
    } else {
      if (currentIndex === actualStudentsTests.length - 1) newIndex = 0;
      else newIndex = currentIndex + 1;
    }

    let newId = Number(actualStudentsTests[newIndex])
    let studentId = studentTests[newId].userId
    dispatch(getStudentTestInfo(assessment.id, studentId))
  }

  handleCheck() {
    const { assessment, dispatch, student, studentTests } = this.props
    dispatch(putStudentTestInfo(assessment.id, student.userId, {isGraded: !student.isGraded}))
  }

  renderStudentInfo() {
    if (this.props.showStudents) {
      const { student } = this.props
      if (student.user) {
        return (
          <div style={Object.assign({}, styles.gradingSubtitle, styles.studentCardSelect, styles.fullWidth)}>
            <img src={student.user.photo} alt={student.user.name} style={styles.student} />
            {student.user.name}
            <p style={{marginTop: '15px'}}>Total Score: <span style={{fontWeight: 600}}>{student.score}</span></p>
          <Checkbox
            label='Fully graded'
            inputStyle={{color: 'green', background: 'green'}}
            labelStyle={{color: 'white', fontWeight: 300}}
            iconStyle={{fill: 'white'}}
            // style={{fill: 'green'}}
            checked={student.isGraded}
            onCheck={this.handleCheck.bind(this)}
          />
          </div>
        )
      }
    }
  }

  renderStudent () {
    
    if (this.props.showStudents) {
      const { assessment } = this.props
      
      return(
        <div>
          {this.renderStudentInfo()}
          <CardActions style={{padding: 0}}>
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

  }


  renderEdit () {
    const { assessment, editable, onEdit } = this.props

    if (editable) {
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

  renderTeamName () {
    if (this.props.showTeam) {
      const { assessment } = this.props
      return (
        <div style={styles.gradingSubtitle}>{`Team: ${assessment.team.name}`}</div>
      )
    }
  }

  renderUrl () {
    if (this.props.showUrl) {
      const { assessment } = this.props
      return (
        <a href="#" style={styles.gradingSubtitle}>{assessment.repoUrl}</a>
      )
    }
  }

  render () {
    const { assessment, onSelect } = this.props

    return (
      <Paper style={Object.assign({}, styles.assessmentInfo, styles.skinny)}>
        <div>
          <div onTouchTap={() => onSelect(assessment.id)}
            style={Object.assign({}, styles.editAssessment, styles.gradingTitle)}>
            {assessment.name}
          </div>
          {this.renderEdit()}
        </div>
          {this.renderTeamName()}
          {this.renderUrl()}
          {this.renderStudent()}
          
      </Paper>
    )
  }
}

AssessmentCard.propTypes = {
  assessment: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func
}

AssessmentCard.defaultProps = {
  showTeam: true,
  showUrl: true
}

export default AssessmentCard
