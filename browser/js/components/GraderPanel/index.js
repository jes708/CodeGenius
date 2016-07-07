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

//Replace the buttons with these icons.  Use tooltips to clarify what each button does

import SvgIcon from 'material-ui/SvgIcon';
import EditorAttachFile from 'material-ui/svg-icons/editor/attach-file' //Add Attachment
import ActionLabel from 'material-ui/svg-icons/action/label' //Add Tag
import ImageExposurePlus1 from 'material-ui/svg-icons/image/exposure-plus-1' //Add Score
import EditorInsertComment from 'material-ui/svg-icons/editor/insert-comment' //Add Description (Maybe change to Add Comment)
import ActionList from 'material-ui/svg-icons/action/list' //Add Criteria
import AVPlaylistAdd from 'material-ui/svg-icons/av/playlist-add' //Add Solution Code

const MarkdownIcon = () => {
  <SvgIcon style={styles.customIcon}>
    <path d="M950.154 192H73.846C33.127 192 0 225.12699999999995 0 265.846v492.308C0 798.875 33.127 832 73.846 832h876.308c40.721 0 73.846-33.125 73.846-73.846V265.846C1024 225.12699999999995 990.875 192 950.154 192zM576 703.875L448 704V512l-96 123.077L256 512v192H128V320h128l96 128 96-128 128-0.125V703.875zM767.091 735.875L608 512h96V320h128v192h96L767.091 735.875z"/>
  </SvgIcon>
} //Add Markdown


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

    handleCheck() {
      this.props.dispatch(putStudentTestInfo(this.props.assessment.id, this.props.student.userId, {isGraded: !this.props.student.isGraded}))
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
  return {
    assessment: assessments.current.base,
    commentCollection: comment.collection ? comment.collection.map( comment => comment ) : null,
    student: assessments.current.student,
    studentTests: studentTestInfo.byId
  }
}


export default connect(mapStateToProps)(GraderPanel)
