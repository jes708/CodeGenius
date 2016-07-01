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
import { getUserAssessments } from '../actions/userAssessmentActions'
import styles from './graderStyles'
import AssessmentForm from './AssessmentForm'

class GraderAssessments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreating: false
    }
  }

  componentWillMount () {
    this.props.dispatch(getUserAssessments())
  }

  toggleForm () {
    this.setState({
      isCreating: !this.state.isCreating
    })
  }

  submitForm (data) {
    alert(JSON.stringify(data))
  }

  renderTags (tags) {
    if (!tags) return;
    return tags.map((tag, i) => {
      return <Chip key={i} style={styles.tag}>{tag}</Chip>
    })
  }

  renderAssessments () {
    if (!this.props.isFetching) {
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

  renderToggleFormButton () {
    return (
      <RaisedButton
        primary={true}
        label={this.state.isCreating ? 'Cancel' : 'Create Assessment'}
        icon={
          this.state.isCreating
            ? <FontIcon className='fa fa-times' />
            : <FontIcon className='fa fa-plus' /> }
        style={styles.skinny}
        onClick={this.toggleForm.bind(this)}
      />
    )
  }

  render () {
    return (
      <div style={Object.assign(styles.gradingPane, styles.paperStyle)}>
        <div style={styles.content}>
          {this.renderToggleFormButton()}
          { this.state.isCreating
            ? <AssessmentForm onSubmit={this.submitForm.bind(this)} />
            : this.renderAssessments() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { isFetching, items } = state.userAssessments
  return {
    isFetching,
    assessments: items
  }
}

export default connect(mapStateToProps)(GraderAssessments)
