'use strict'

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux';
import styles from './graderStyles';
import {getComments, postComment, getCommentsByStudentAndAssessment, postCommentByStudentAndAssessment} from './Comment/apiActions';
import Checkbox from 'material-ui/Checkbox'
import { getStudentTestInfo, putStudentTestInfo } from '../actions/studentTestInfoActions'

// function buildGraderPanel(dispatch){
//   return dispatch({type: 'COMMENT_EDIT_DONE', payload: {key: null} })
// }

const StudentViewComments = ({ comments }) => {
  if (comments) {
    return (
      <div style={{...styles.gradingPane, ...styles.paperStyle}}>
        <div style={styles.content}>
          <List>
            {comments.map((contents, index) => {
              return (
                <Card key={index}>
                  <CardText>
                    <pre>{contents.selectionString}</pre>
                    {contents.description}
                  </CardText>
                </Card>
              )
            })}
          </List>
        </div>
      </div>
    )
  } else return <div></div>
}

export default StudentViewComments

