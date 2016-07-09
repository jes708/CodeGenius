'use strict'

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import AssessmentForm from './AssessmentForm'
import styles from './graderStyles'
import { getStudentTestInfo, putStudentTestInfo, putStudentTestsInfo } from '../actions/studentTestInfoActions'
import { CardActions } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Dialog from 'material-ui/Dialog'
import { green500 } from 'material-ui/styles/colors'


class AssessmentCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

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

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleSubmitToStudent() {
    const { assessment, dispatch, student } = this.props;
    this.setState({open: false});
    dispatch(putStudentTestInfo(assessment.id, student.userId, {isSent: true}));
  }

  handleSubmitToStudents() {
    const { assessment, dispatch, studentTests } = this.props;
    this.setState({open: false});
    studentTests.forEach(test => {
      if (test.assessmentId === assessment.id && test.isGraded) {
        dispatch(putStudentTestInfo(assessment.id, test.userId, {isSent: true}));
      }
    })
    
  }

  renderSubmit(buttonTitle, dialogMessage) {
    if (this.props.showSubmit) {
      let handleTouchTap = this.props.showStudents ? this.handleSubmitToStudent.bind(this) : this.handleSubmitToStudents.bind(this)
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose.bind(this)}
          />,
          <FlatButton
            label="Confirm"
            primary={true}
            keyboardFocused={true}
            onTouchTap={handleTouchTap}
          />,
        ];

      return (
        <div>
          <FlatButton
            label={buttonTitle}
            onTouchTap={this.handleOpen.bind(this)}
            hoverColor={'#2196F3'}
            rippleColor={'#90CAF9'}
            style={{color: '#F5F5F5'}}
          />
          <Dialog
            title="Confirm Submit"
            actions={actions}
            modal={true}
            open={this.state.open}
            onRequestClose={this.handleClose.bind(this)}
          >
            {dialogMessage}
          </Dialog>
        </div>
      )
    }
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
    const { assessment, onSelect, student } = this.props
    
    let buttonTitle, dialogMessage, fn;
    if (onSelect) fn = () => onSelect(assessment.id);

    if (this.props.showStudents && student.user) {
      buttonTitle = student.isSent ? 'Submitted' : 'Submit to Student'
      dialogMessage = student.isSent ? `You have already sent ${student.user.name} your evaluation. Send again?` : `Send ${student.user.name} your evaluation?`
    } else if (this.props.showSubmit) {
      buttonTitle = 'Submit all graded';
      dialogMessage = 'Send all fully graded students their evaluations?';
    }

    return (
      <Paper style={Object.assign({}, styles.assessmentInfo, styles.skinny)}>
        <div>
          <div onTouchTap={fn}
            style={Object.assign({}, styles.editAssessment, styles.gradingTitle)}>
            {assessment.name}
          </div>
          {this.renderEdit()}
        </div>
          {this.renderTeamName()}
          {this.renderUrl()}
          {this.renderStudent()}
          {this.renderSubmit(buttonTitle, dialogMessage)}
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
  showUrl: true,
  showSubmit: false
}

export default AssessmentCard
