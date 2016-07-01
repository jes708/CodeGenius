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
import { getUserAssessments, createAssessment } from '../actions/assessmentActions'
import styles from './graderStyles'
import AssessmentForm from './AssessmentForm'
import { onActive } from 'material-ui/Tabs'
import { getAllAssessments } from '../reducers/assessments'

class GraderAssessments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreating: false
    }
  }

  componentWillMount () {
    if (this.props.user) {
      this.props.dispatch(getUserAssessments(this.props.user.id))
    }
  }

  toggleForm () {
    this.setState({
      isCreating: !this.state.isCreating
    })
  }

  submitForm (data) {
    console.log(data)
    // this.props.dispatch(createAssessment(data))
    // this.props.switchTabs('Panel')
  }



  renderTags (tags) {
    if (tags) {
      return tags.map((tag, i) => {
        return <Chip key={i} style={styles.tag}>{tag}</Chip>
      })
    }
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
    } else if (!this.props.isFetching && !this.props.assessments.length) {
      return <h1 style={{textAlign: 'center'}}>No Assessments</h1>
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

GraderAssessments.propTypes = {
  switchTabs: PropTypes.func.isRequired
}

GraderAssessments.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { session, assessments } = state
  const { isFetching } = assessments
  const { user } = session
  return {
    isFetching,
    assessments: getAllAssessments(assessments.byId),
    user
  }
}

export default connect(mapStateToProps)(GraderAssessments)
