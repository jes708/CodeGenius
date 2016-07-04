'use strict'

import React, { Component, PropTypes } from 'react'
import axios from 'axios';

import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AlertError from 'material-ui/svg-icons/alert/error'
import ImageLens from 'material-ui/svg-icons/image/lens'
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

  // componentWillReceiveProps(nextProps) {
  //   console.log('will receive props', nextProps)
  //   nextProps.dispatch(getStudentTestInfo(studentTestInfo.assessmentId, studentTestInfo.userId))
  // }

  handleToggle () {
    this.props.dispatch(putStudentTestInfo(this.props.studentTest.assessmentId, this.props.studentTest.userId, !this.props.studentTest.isStudent));
  }

// change iconSwitcher to have status done no-repo or score
  render () {
    const { onSelect } = this.props
    let id = this.props.studentTest.id;
    // this.props.studentTestInfo[id].score.totalScore();

    let iconSwitcher = () => {
        if (this.props.studentTestInfo[id].isGraded) {
          return <ActionCheckCircle style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)} color={green500}/>;
        } else if (!this.props.studentTestInfo[id].repoUrl) {
          return <AlertError style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)} color={red500}/>;
        } else {
          return <ImageLens style={Object.assign({}, styles.toggle, styles.studentIcon)} color={'transparent'}/>;
          // return <div style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)}><span style={styles.gradeNum}>{this.props.studentTestInfo[id].score}</span></div>;
        }
      }

    let style;
    style = this.props.studentTestInfo[id].isStudent ? styles.infoCard : styles.inactiveCard;
    return (
      <Card style={Object.assign({}, style, styles.skinny, styles.roundedCard)}>
        <div style={styles.gradingInfo}>
          <a href="#" style={styles.gradingSubtitle}
            onClick={() => { onSelect(this.props.studentTest.user.id) }}
          >
            <img src={this.props.studentTest.user.photo} alt={this.props.studentTest.user.name} style={styles.student}/>
            {this.props.studentTest.user.name}
          </a>
          {iconSwitcher()}
          <Toggle toggled={this.props.studentTestInfo[id].isStudent} onToggle={this.handleToggle.bind(this)} style={styles.toggle}/>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { studentTestInfo } = state
  const { isFetching } = studentTestInfo

  return {
    isFetching,
    studentTestInfo: studentTestInfo.byId
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
