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

const styles = {
  paperStyle: {
    height: '100%',
    overflow: 'scroll'
  },
  content: {
    padding: 16
  },
  gradingPane: {
    backgroundColor: '#64B5F6'
  },
  skinny: {
    margin: 0,
    marginBottom: 15
  },
  noTopPadding: {
    paddingTop: 0
  },
  infoCard: {
    backgroundColor: '#1E88E5'
  },
  gradingPane: {
    backgroundColor: '#64B5F6'
  },
  gradingInfo: {
    color: '#FFF',
    padding: 16
  },
  gradingTitle: {
    fontSize: 24,
    fontWeight: '400'
  },
  gradingSubtitle: {
    fontSize: 16,
    color: '#F5F5F5',
    fontWeight: '300'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  tag: {
    margin: 4
  }
}

const SAMPLE_SPEC = {
  "Fake Library App": [
    "static files (from the static folder in the public folder) on /files route",
    "handles internal server errors",
    "handles custom errors",
  ],
  "Fake Library App /api/books": [
    "GET all",
    "POST one"
  ]
}

class GraderAssessments extends Component {

  componentWillMount () {
    this.props.dispatch(getUserAssessments())
  }

  renderTags (tags) {
    return tags.map((tag, i) => {
      return <Chip style={styles.tag}>{tag}</Chip>
    })
  }

  renderAssessments () {
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
  }

  render () {
    if (this.props.isFetching) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div style={Object.assign(styles.gradingPane, styles.paperStyle)}>
          <div style={styles.content}>
            {this.renderAssessments()}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  const { userAssessments } = state
  const { isFetching, items } = userAssessments || {
    isFetching: true,
    items: []
  }
  return {
    isFetching,
    assessments: items
  }
}

export default connect(mapStateToProps)(GraderAssessments)
