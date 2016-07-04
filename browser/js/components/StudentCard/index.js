'use strict'

import React, { Component, PropTypes } from 'react'
import axios from 'axios';

import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AlertError from 'material-ui/svg-icons/alert/error'
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked'
import styles from '../graderStyles'
import { green500, red500 } from 'material-ui/styles/colors'
import { getStudentTestInfo, getStudentTestsInfo, putStudentTestInfo } from '../../actions/studentTestInfoActions'
import { getAllStudentTests, getStudentTestFor } from '../../reducers/studentTestInfo'

class StudentCard extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount () {
    // this.props.dispatch(getStudentTestInfo(this.props.assessmentId, this.props.studentTest.user.id))
    this.props.dispatch(getStudentTestInfo(this.props.studentTest.assessmentId, this.props.studentTest.userId))
  }

  handleToggle () {
    this.props.dispatch(putStudentTestInfo(this.props.studentTest.assessmentId, this.props.studentTest.userId, !this.props.studentTest.isStudent));
  }

// change iconSwitcher to have status done no-repo or score
  render () {
    let iconSwitcher = () => {
      switch (this.props.studentTest.isGraded) {
        case true:
          return <ActionCheckCircle style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)} color={green500}/>;
        case false:
          return <AlertError style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)} color={red500}/>;
        default:
          return <div style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)}><span style={styles.gradeNum}>{this.props.studentTest.score}</span></div>;
      }
    }
    let style;
    style = this.props.studentTest.isStudent ? styles.infoCard : styles.inactiveCard;
    return (
      <Card style={Object.assign({}, style, styles.skinny, styles.roundedCard)}>
        <div style={styles.gradingInfo}>
          <a href="#" style={styles.gradingSubtitle}>
            <img src={this.props.studentTest.user.photo} alt={this.props.studentTest.user.name} style={styles.student}/>
            {this.props.studentTest.user.name}
          </a>
          {iconSwitcher()}
          <Toggle toggled={this.props.studentTest.isStudent} onToggle={this.handleToggle.bind(this)} style={styles.toggle}/>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { studentTestInfo } = state
  const { isFetching } = studentTestInfo
  console.log("AT LEAST YOU GOT THIS FAR", getAllStudentTests(studentTestInfo.byId))
  return {
    isFetching,
    studentTestInfo: getAllStudentTests(studentTestInfo.byId)
    // toggled: getStudentTestFor(studentTestInfo, 1),
    // style: getStudentTestFor(studentTestInfo, 1),
    // status: getStudentTestFor(studentTestInfo, 1)
  }
}

// const mapStateToProps = state => {
//   const { studentTestInfo } = state
//   const { toggled, style, status } = studentTestInfo
//   return {
//     toggled,
//     style,
//     status
//   }
// }

// const mapStateToProps = state => {
//   const { session, assessments } = state
//   const { isFetching } = assessments
//   const { user } = session
//   return {
//     isFetching,
//     assessments: getAllAssessments(assessments.byId),
//     user
//   }
// }

export default connect(mapStateToProps)(StudentCard)
