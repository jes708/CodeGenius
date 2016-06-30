'use strict'

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import styles from './graderStyles'

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

export default class GraderHome extends Component {
  constructor(){
    super()
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
          </Card>
        </div>
      </div>
    )
  }
}
