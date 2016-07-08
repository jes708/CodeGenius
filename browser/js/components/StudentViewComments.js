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
import AssessmentCard from './AssessmentCard'


class StudentViewComments extends Component {

  constructor(props){
    super(props)
  }

  render () {
    return (
      <div style={Object.assign({}, styles.gradingPane, styles.paperStyle)}>
        <div style={styles.content}>
        {this.props.assessment.basePath
        ?
        <AssessmentCard
          assessment={this.props.assessment}
          editable={false}
          student={true}
        />
        : null
        }
          <List>
              {(this.props.comments.length) ? (
                this.props.comments.map((contents, index) => {
                    return (
                      <Card key={index}>
                        <CardText>
                          <pre>{contents.selectionString}</pre>
                          {contents.description}
                        </CardText>
                      </Card>
                    )
                  })) : null
              }
          </List>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { assessments } = state
  let assessment = {}
  if (assessments.current.base.basePath) {
    assessment = assessments.current.base
  }
  return {
    assessment: assessment,
    comments: state.studentTestInfo.studentTest
  }
}


export default connect(mapStateToProps)(StudentViewComments)
