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
import styles from '../graderStyles';
import {getComments, postComment, getCommentsByStudentAndAssessment, postCommentByStudentAndAssessment} from '../Comment/apiActions';
import Checkbox from 'material-ui/Checkbox'
import { getStudentTestInfo, putStudentTestInfo } from '../../actions/studentTestInfoActions'
import AssessmentCard from '../AssessmentCard'


function buildGraderPanel(dispatch){
  return dispatch({type: 'COMMENT_EDIT_DONE', payload: {key: null} })
}

class GraderPanel extends Component {

  constructor(props){
    super(props)
    this.getComments();
    this.createNewComment = this.createNewComment.bind(this);
    this.state = {
      commentCollection: []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      commentCollection: nextProps.commentCollection
    })
  }

  componentWillMount(){
    buildGraderPanel(this.props.dispatch);
  }

  createNewComment(){
    let {studentId, assessmentId} = this.getStudentAndAssessment()
    this.props.dispatch(postCommentByStudentAndAssessment(studentId, assessmentId, {}));
  }

  getComments(){
    let {studentId, assessmentId} = this.getStudentAndAssessment()
    // this.props.dispatch(getComments());
    this.props.dispatch(getCommentsByStudentAndAssessment(assessmentId, studentId))
  }

  getStudentAndAssessment(){
    let assessmentId = this.props.assessment.id;
    let studentId = this.props.student.userId;
    return {studentId, assessmentId}
  }

  render () {
    let {studentId, assessmentId} = this.getStudentAndAssessment();
    return (
      <div style={Object.assign({}, styles.gradingPane, styles.paperStyle)}>
        <div style={styles.content}>
          <AssessmentCard
            {...this.props}
            editable={false}
            showStudents={true}
            showTeam={false}
            showUrl={false}
          />
          <RaisedButton
            label='Add Comment'
            primary={true}
            icon={<FontIcon className='fa fa-plus' />}
            style={styles.skinny}
            onClick={this.createNewComment}
          />
          <List>
              {(this.state.commentCollection.length) ? (
                this.state.commentCollection.map((contents, index) => {
                    return (
                      <CommentCard
                        key={index}
                        commentIndex={contents.commentIndex}
                        contents={contents}
                        studentId={studentId}
                        assessmentId={assessmentId}
                          >
                      </ CommentCard>
                    )
                  })) : (
                    <h2>Add a comment!</h2>
                  )
              }
          </List>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { assessments, studentTestInfo, comment } = Object.assign({}, state);
  return {
    assessment: assessments.current.base,
    commentCollection: comment.collection ? comment.collection.map( comment => comment ) : null,
    student: assessments.current.student,
    studentTests: studentTestInfo.byId
  }
}


export default connect(mapStateToProps)(GraderPanel)
