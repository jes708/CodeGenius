'use strict'

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import CommentCard from '../Comment';

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

export default class GraderPanel extends Component {
  renderCriterion () {
    return (
      <RadioButtonGroup name="criteria">
        <RadioButton
          value="1"
          label="Unbearable"
        />
        <RadioButton
          value="2"
          label="Horrible"
        />
        <RadioButton
          value="3"
          label="Acceptable"
        />
        <RadioButton
          value="4"
          label="Near Perfect"
        />
        <RadioButton
          value="5"
          label="Flawless"
        />
      </RadioButtonGroup>
    )
  }

  renderCards () {
    let cards = []

    cards = Object.keys(SAMPLE_SPEC).map((title, i) => {
      return SAMPLE_SPEC[title].map((spec, j) => {
        return (
          <CommentCard {...this.props} key={(i + ' ' + j)} title={title} spec = {spec} renderCriterion = {this.renderCriterion} >
          </ CommentCard>
        )
      })
    })
    return cards
  }

  render () {
    return (
      <div style={Object.assign(styles.gradingPane, styles.paperStyle)}>
        <div style={styles.content}>
          <Card style={Object.assign(styles.infoCard, styles.skinny)}>
            <div style={styles.gradingInfo}>
              <div style={styles.gradingTitle}>Assessment 3 - Express/Sequelize</div>
              <a style={styles.gradingSubtitle} href='https://github.com/FullstackAcademy/checkpoint-express-sequelize'>
                GitHub Repo
              </a>
            </div>
            <CardActions>
              <FlatButton
                label='Previous Student'
                hoverColor={'#2196F3'}
                rippleColor={'#90CAF9'}
                style={{color: '#F5F5F5'}}
              />
              <FlatButton
                label='Next Student'
                hoverColor={'#2196F3'}
                rippleColor={'#90CAF9'}
                style={{color: '#F5F5F5'}}
              />
            </CardActions>
          </Card>
          <RaisedButton
            label='Add Question'
            primary={true}
            icon={<FontIcon className='fa fa-plus' />}
            style={styles.skinny}
          />
          {this.renderCards()}
        </div>
      </div>
    )
  }
}
