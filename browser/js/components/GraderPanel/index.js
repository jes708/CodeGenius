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
import {getComments, postComment} from '../Comment/apiActions';
import Checkbox from 'material-ui/Checkbox'
import { getStudentTestInfo, putStudentTestInfo } from '../../actions/studentTestInfoActions'

function buildGraderPanel(dispatch){
  return dispatch({type: 'COMMENT_EDIT_DONE', payload: {key: null} })
}

export default class GraderPanel extends Component {

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
    this.props.dispatch(postComment({}));
  }

  getComments(){
    this.props.dispatch(getComments());
  }

    handleCheck() {
      this.props.dispatch(putStudentTestInfo(this.props.assessment.id, this.props.student.userId, {isGraded: !this.props.student.isGraded}))
    }

    handleStudentShift(direction) {
      const { dispatch, assessment, student, studentTests } = this.props
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
      let studentId = this.props.studentTests[newId].userId
      this.props.dispatch(getStudentTestInfo(this.props.assessment.id, studentId))
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

          //     <Card style={Object.assign(styles.infoCard, styles.skinny)}>
          //   <div style={styles.gradingInfo}>
          //     <div style={styles.gradingTitle}>{this.props.assessment.name}</div>
          //     {this.renderStudentInfo()}
          //   </div>
          //   <CardActions>
          //     <FlatButton
          //       label='Previous Student'
          //       onClick={this.handleStudentShift.bind(this, "prev")}
          //       hoverColor={'#2196F3'}
          //       rippleColor={'#90CAF9'}
          //       style={{color: '#F5F5F5'}}
          //     />
          //     <FlatButton
          //       label='Next Student'
          //       onClick={this.handleStudentShift.bind(this, "next")}
          //       hoverColor={'#2196F3'}
          //       rippleColor={'#90CAF9'}
          //       style={{color: '#F5F5F5'}}
          //     />
          //   </CardActions>
          // </Card>

  render () {
    return (
      <div style={Object.assign({}, styles.gradingPane, styles.paperStyle)}>
        <div style={styles.content}>
          <AssessmentCard
            assessment={this.props.assessment}
            editable={false}
            student={true}
            prev={this.handleStudentShift.bind(this, "prev")}
            next={this.handleStudentShift.bind(this, "next")}
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
