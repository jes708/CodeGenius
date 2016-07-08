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
import CommentsList from './CommentsList';
import AssessmentCard from '../AssessmentCard'


function buildGraderPanel(dispatch){
  return dispatch({type: 'COMMENT_EDIT_DONE', payload: {key: null} })
}

class GraderPanel extends Component {

  constructor(props){
    super(props)
    this.createNewComment = this.createNewComment.bind(this);
    this.state = {
      commentCollection: [],
      loaded: false
    }
    this.getComments = this.getComments.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.current && nextProps.current.studentId && nextProps.current.assessmentId) this.setState({loaded: true});
    this.setState({
      commentCollection: nextProps.commentCollection
    })
    if(nextProps.current && nextProps.current.studentId && nextProps.current.assessmentId && this.state.loaded === false ){
      this.getComments();
    }
  }

  componentDidMount(){
    // this.getComments();
  }

  componentWillMount(){
    // buildGraderPanel(this.props.dispatch);
  }

  createNewComment(){
    let {studentId, assessmentId} = this.getStudentAndAssessment()
    this.props.dispatch(postCommentByStudentAndAssessment(studentId, assessmentId, {}));
  }

  getComments(){
    let {studentId, assessmentId} = this.getStudentAndAssessment()
    // this.props.dispatch(getComments());
    if(studentId && assessmentId) {
      this.props.dispatch(getCommentsByStudentAndAssessment(studentId, assessmentId))
    }
  }

  getStudentAndAssessment(){
    let assessmentId = this.props.assessment.id;
    let studentId = this.props.student.userId;
    return {studentId, assessmentId}
  }

  handleCheck() {
    this.props.dispatch(putStudentTestInfo(this.props.assessment.id, this.props.student.userId, {isGraded: !this.props.student.isGraded}))
  }

  handleStudentShift(direction) {
    let currentId = String(this.props.student.id);
    let studentTestArray = Object.keys(this.props.studentTests)
    let currentIndex = studentTestArray.indexOf(currentId);
    let newIndex;

    if (direction === "prev") {
      if (currentIndex === 0) newIndex = studentTestArray.length - 1;
      else newIndex = currentIndex - 1;
    } else {
      if (currentIndex === studentTestArray.length - 1) newIndex = 0;
      else newIndex = currentIndex + 1;
    }

    let newId = Number(studentTestArray[newIndex])
    let studentId = this.props.studentTests[newId].userId;
    this.props.dispatch(getStudentTestInfo(this.props.assessment.id, studentId))
  }

  render () {
    // let {studentId, assessmentId} = this.getStudentAndAssessment();
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
          <div>
            <CommentsList
              {...this.props}
            />
          </div>
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
  const { assessments, studentTestInfo, comment } = Object.assign({}, state);
  let nextState = {
    assessment: assessments.current.base,
    commentCollection: comment.collection ? comment.collection.map( comment => comment ) : null,
    student: assessments.current.student,
    studentTests: studentTestInfo.byId,
    commentsList: {
      isFetching: comment.isFetching,
      failed: comment.failed
    }
  }
  if(comment.current){
    nextState.studentId = comment.current.userId;
    nextState.assessmentId = comment.current.assessmentId;
  }
  return nextState;
}


export default connect(mapStateToProps)(GraderPanel)
