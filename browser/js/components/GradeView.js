'use strict'

import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

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

const styles = {
  paperStyle: {
    height: '89vh',
    overflow: 'scroll'
  },
  content: {
    padding: 16
  },
  row: {
    paddingRight: 30,
    paddingLeft: 30
  },
  container: {
    padding: 10
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

export default class GradeView extends Component {
  renderCriterion () {
    return (
      <RadioButtonGroup>
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
    Object.keys(SAMPLE_SPEC).forEach(title => {
      SAMPLE_SPEC[title].forEach(spec => {
        cards.push(
          <Card style={styles.skinny}>
            <CardHeader
              title={title}
              subtitle={spec}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true} style={styles.noTopPadding}>
              <hr style={styles.skinny} />
              {this.renderCriterion()}
            </CardText>
            <CardActions expandable={true}>
              <FlatButton
                label='Add Criterion'
                icon={<FontIcon className='fa fa-plus' />}
              />
              <FlatButton
                label='Add Comment'
                icon={<FontIcon className='fa fa-pencil' />}
              />
            </CardActions>
          </Card>
        )
      })
    })
    return cards
  }

  render () {
    return (
      <div className='row' style={styles.row}>
        <div className='col-lg-8'>
          <Paper zDepth={2} style={styles.paperStyle}>
            <div style={styles.content}>
              <h1>Grade View</h1>
            </div>
          </Paper>
        </div>
        <div className='col-lg-4'>
          <Paper zDepth={2} style={Object.assign(styles.gradingPane, styles.paperStyle)}>
            <div style={styles.content}>
              <Card style={Object.assign(styles.infoCard, styles.skinny)}>
                <div style={styles.gradingInfo}>
                  <div style={styles.gradingTitle}>Assessment Title</div>
                  <div style={styles.gradingSubtitle}>GitHub Repo Link</div>
                </div>
                <CardActions>
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
          </Paper>
        </div>
      </div>
    )
  }
}

GradeView.propTypes = {
}
