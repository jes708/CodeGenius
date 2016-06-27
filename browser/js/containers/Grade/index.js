'use strict'

import React, { Component, PropTypes } from 'react'
import { PrismCode } from 'react-prism'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import GraderPanel from '../../components/GraderPanel'

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
  skinny: {
    margin: 0,
    marginBottom: 15
  }
}

export class GradeRepl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      content: ''
    }
  }
  getData () {
    fetch('https://raw.githubusercontent.com/jes708/assessment-express-sequelize/master/models/article.js?token=AFJQ-XVgFA056_WGPpBVtQs2M3cBe_Tyks5XeLBfwA%3D%3D')
    .then(res => res.text())
    .then(content => {
      this.setState({
        isLoading: false,
        content: content
      })
    })
    .catch(() => new Error('Error while fetching data'))
  }
  componentDidMount() {
    this.getData()
  }
  render(){
    return this.state.isLoading ? (<h1>Loading!</h1>) : (
      <div className='col-lg-8'>
        <Paper zDepth={2} style={styles.paperStyle}>
          <div style={styles.content}>
            <h2 style={styles.skinny}>/models/article.js</h2>
            <pre className='line-numbers language-javascript'>
              <PrismCode className='language-javascript'>
                {this.state.content}
              </PrismCode>
            </pre>
          </div>
        </Paper>
      </div>
    )
  }
}

export default class GradeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  render () {
    if (this.state.isLoading) {
      return <h1>Loading!</h1>
    } else {
      return (
        <div className='row' style={styles.row}>
          <GradeRepl />
          <div className='col-lg-4'>
            <Paper zDepth={2} style={styles.paperStyle}>
              <GraderPanel />
            </Paper>
          </div>
        </div>
      )
    }
  }
}

GradeView.propTypes = {
}
