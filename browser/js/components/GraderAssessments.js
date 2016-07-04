'use strict'

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import {
  getUserAssessments,
  createAssessment,
  updateAssessment,
  switchAssessment
} from '../actions/assessmentActions'
import styles from './graderStyles'
import AssessmentForm from './AssessmentForm'
import AssessmentCard from './AssessmentCard'
import { onActive } from 'material-ui/Tabs'
import { getAllAssessments } from '../reducers/assessments'

class GraderAssessments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreating: false,
      isEditting: false,
      editAssessment: {}
    }
  }

  componentWillMount () {
    this.props.dispatch(getUserAssessments())
  }

  handleSelectAssessment (assessmentId) {
    this.props.dispatch(switchAssessment(assessmentId))
  }

  handleEditAssessment (assessment) {
    this.setState({
      editAssessment: assessment,
      isEditting: true,
      isCreating: false
    })
  }

  cancelEdit () {
    this.setState({
      isCreating: false,
      isEditting: false
    })
  }

  toggleForm () {
    this.setState({
      isCreating: !this.state.isCreating,
      isEditting: false
    })
  }

  submitForm (data) {
    const { isCreating, isEditting } = this.state

    if (isCreating) {
      this.props.dispatch(createAssessment(data))
      this.setState({
        isCreating: false
      })
    } else if (isEditting) {
      this.props.dispatch(updateAssessment(data))
      this.setState({
        isEditting: false
      })
    }
  }

  renderAssessments () {
    const { isFetching, assessments } = this.props
    if (!isFetching && assessments.length) {
      return assessments.map((assessment, i) => {
        return (
          <AssessmentCard
            key={i}
            assessment={assessment}
            onSelect={this.handleSelectAssessment.bind(this)}
            onEdit={this.handleEditAssessment.bind(this)}
          />
        )
      })
    } else if (!isFetching && !assessments.length) {
      return <h1 style={{textAlign: 'center'}}>No Assessments</h1>
    } else {
      return <h1 style={{textAlign: 'center'}}>Loading...</h1>
    }
  }

  renderToggleFormButton () {
    const { isCreating, isEditting } = this.state

    return (
      <RaisedButton
        primary={true}
        label={isCreating || isEditting ? 'Cancel' : 'Create Assessment'}
        icon={
          isCreating || isEditting
            ? <FontIcon className='fa fa-times' />
            : <FontIcon className='fa fa-plus' /> }
        style={styles.skinny}
        onClick={
          !isCreating && !isEditting
          ? this.toggleForm.bind(this)
          : this.cancelEdit.bind(this)
        }
      />
    )
  }

  renderForm () {
    const { isEditting, isCreating, editAssessment } = this.state
    let form

    if (isCreating) {
      form = <AssessmentForm onSubmit={this.submitForm.bind(this)} />
    } else if (isEditting) {
      form = <AssessmentForm assessment={editAssessment} onSubmit={this.submitForm.bind(this)} />
    } else {
      form = this.renderAssessments()
    }
    return form
  }

  render () {
    return (
      <div style={Object.assign({}, styles.gradingPane, styles.paperStyle)}>
        <div style={styles.content}>
          {this.renderToggleFormButton()}
          {this.renderForm()}
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
