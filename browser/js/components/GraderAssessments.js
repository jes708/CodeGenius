'use strict'

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { getUserAssessments } from '../actions/assessmentActions'
import styles from './graderStyles'

class GraderAssessments extends Component {

  componentWillMount () {
    this.props.dispatch(getUserAssessments(1))
  }

  renderTags (tags) {
    return tags.map((tag, i) => {
      return <Chip key={i} style={styles.tag}>{tag}</Chip>
    })
  }

  renderAssessments () {
    if (!this.props.isFetching && this.props.assessments.length) {
      return this.props.assessments.map((assessment, i) => {
        return (
          <Card key={i} style={Object.assign({}, styles.infoCard, styles.skinny)}>
            <div style={styles.gradingInfo}>
              <div style={styles.gradingTitle}>{assessment.name}</div>
              <a href="#" style={styles.gradingSubtitle}>{assessment.repoUrl}</a>
              <div style={styles.tags}>
                {this.renderTags(assessment.tags)}
              </div>
            </div>
          </Card>
        )
      })
    } else {
      return <h1 style={{textAlign: 'center'}}>Loading...</h1>
    }
  }

  render () {
    return (
      <div style={Object.assign(styles.gradingPane, styles.paperStyle)}>
        <div style={styles.content}>
          {this.renderAssessments()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { isFetching, items } = state.assessments || {
    isFetching: false,
    items: []
  }
  return {
    isFetching,
    assessments: items
  }
}

export default connect(mapStateToProps)(GraderAssessments)
