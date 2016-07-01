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

export default class StudentCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggled: true,
      style: styles.infoCard,
      status: 'done'
    }
  }

  handleToggle () {
    if (this.state.toggled) this.setState({toggled: false, style: styles.inactiveCard});
    else if (!this.state.toggled) this.setState({toggled: true, style: styles.infoCard});
  }

  render () {
    let iconSwitcher = () => {
      switch (this.state.status) {
        case 'done':
          return <ActionCheckCircle style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)} color={green500}/>;
        case 'no-repo':
          return <AlertError style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)} color={red500}/>;
        default:
          return <div style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)}><span style={styles.gradeNum}>{this.state.status}</span></div>;
      }
    }
    return (
      <Card style={Object.assign({}, this.state.style, styles.skinny, styles.roundedCard)}>
        <div style={styles.gradingInfo}>
          <a href="#" style={styles.gradingSubtitle}>
            <img src={this.props.student.photo} alt={this.props.student.name} style={styles.student}/>
            {this.props.student.name}
          </a>
          {iconSwitcher()}
          <Toggle toggled={this.state.toggled} onToggle={this.handleToggle.bind(this)} style={styles.toggle}/>
        </div>
      </Card>
    )
  }
}
