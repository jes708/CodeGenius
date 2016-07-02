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
import { getStudentTestInfo, putStudentTestInfo } from '../../actions/studentTestInfoActions'

class StudentCard extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getStudentTestInfo(this.props.assessmentId, this.props.student.id))
  }

  handleToggle () {
    this.props.dispatch(putStudentTestInfo(this.props.assessmentId, this.props.student.id, !this.props.toggled));
  }

  render () {
    let iconSwitcher = () => {
      switch (this.props.status) {
        case 'done':
          return <ActionCheckCircle style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)} color={green500}/>;
        case 'no-repo':
          return <AlertError style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)} color={red500}/>;
        default:
          return <div style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)}><span style={styles.gradeNum}>{this.props.status}</span></div>;
      }
    }
    return (
      <Card style={Object.assign({}, this.props.style, styles.skinny, styles.roundedCard)}>
        <div style={styles.gradingInfo}>
          <a href="#" style={styles.gradingSubtitle}>
            <img src={this.props.student.photo} alt={this.props.student.name} style={styles.student}/>
            {this.props.student.name}
          </a>
          {iconSwitcher()}
          <Toggle toggled={this.props.toggled} onToggle={this.handleToggle.bind(this)} style={styles.toggle}/>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { studentTestInfo } = state
  const { isFetching, toggled, style, status } = studentTestInfo
  return {
    isFetching,
    toggled,
    style,
    status
  }
}

export default connect(mapStateToProps)(StudentCard)
