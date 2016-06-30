'use strict'

import React, { Component, PropTypes } from 'react'
import axios from 'axios';

import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'
import styles from '../graderStyles'

export default class StudentCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggled: true,
      done: false,
      style: styles.infoCard};
  }

  handleCheck () {
    if (this.state.done) this.setState({done: false});
    else if (!this.state.done) this.setState({done: true});
  }

  handleToggle () {
    if (this.state.toggled) this.setState({toggled: false, style: styles.inactiveCard});
    else if (!this.state.toggled) this.setState({toggled: true, style: styles.infoCard});
  }

  render () {
    return (
      <Card style={Object.assign({}, this.state.style, styles.skinny)}>
        <div style={styles.gradingInfo}>
          <a href="#" style={styles.gradingSubtitle}>
            <img src={this.props.student.photo} alt={this.props.student.name} style={styles.student}/>
            {this.props.student.name}
          </a>
          <Checkbox checked={this.state.done} onCheck={this.handleCheck.bind(this)} style={styles.toggle}/>
          <Toggle toggled={this.state.toggled} onToggle={this.handleToggle.bind(this)} style={styles.toggle}/>
        </div>
      </Card>
    )
  }
}
