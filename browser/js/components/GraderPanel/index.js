'use strict'

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import CommentCard from '../Comment';
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux';
import styles from '../graderStyles'
import Checkbox from 'material-ui/Checkbox'
import { putStudentTestInfo } from '../../actions/studentTestInfoActions'

function buildGraderPanel(dispatch){
  return dispatch({type: 'COMMENT_EDIT_DONE', payload: {key: null} })
}

export default class GraderPanel extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    buildGraderPanel(this.props.dispatch);
  }

  handleCheck() {
    this.props.dispatch(putStudentTestInfo(this.props.assessment.id, this.props.student.userId, {isGraded: !this.props.student.isGraded}))
  }

  renderStudentInfo() {
    if (this.props.student.user) {
      return (
        <div style={Object.assign({}, styles.gradingSubtitle, styles.studentCardSelect)}>
          <img src={this.props.student.user.photo} alt={this.props.student.user.name} style={styles.student} />
          {this.props.student.user.name}
        </div>
      )
    }
  }

  render () {
    return (
      <div style={Object.assign({}, styles.gradingPane, styles.paperStyle)}>
        <div style={styles.content}>
          <Card style={Object.assign(styles.infoCard, styles.skinny)}>
            <div style={styles.gradingInfo}>
              <div style={styles.gradingTitle}>{this.props.assessment.name}</div>
              {this.renderStudentInfo()}
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
            label='Add Comment'
            primary={true}
            icon={<FontIcon className='fa fa-plus' />}
            style={styles.skinny}
          />
          <List>
            {this.props.comments.map((contents, index) => {
                return (
                  <CommentCard key={index} contents={contents} commentIndex={index}  >
                  </ CommentCard>
                )
            })}
          </List>
          <Checkbox
            label='Fully graded'
            checked={this.props.student.isGraded}
            onCheck={this.handleCheck.bind(this)}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { assessments } = state
  return {
    assessment: assessments.current.base,
    student: assessments.current.student
  }
}


export default connect(mapStateToProps)(GraderPanel)
