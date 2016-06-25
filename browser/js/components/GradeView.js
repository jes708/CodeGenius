'use strict'

import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'

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
  grader: {
    backgroundColor: '#64B5F6'
  },
  skinny: {
    margin: 0,
    marginBottom: 15
  },
  noTopPadding: {
    paddingTop: 0
  }
}

export default class GradeView extends Component {
  renderCards () {
    let cards = []
    for (let i = 0; i < 5; i++) {
      cards.push(
        <Card>
          <CardHeader
            title={`Question ${i + 1}`}
            subtitle={`Question ${i + 1} Details`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={styles.noTopPadding}>
            <hr style={styles.skinny} />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions expandable={true}>
            <FlatButton
              label='Add Criterion'
              icon={<FontIcon className='fa fa-plus' />}
            />
          </CardActions>
        </Card>
      )
    }
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
          <Paper zDepth={2} style={Object.assign(styles.grader, styles.paperStyle)}>
            <div style={styles.content}>
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
