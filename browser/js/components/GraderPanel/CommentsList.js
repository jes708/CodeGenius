'use strict';

import React, { Component, PropTypes } from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import GraderPanelStyles from './styles';
import CommentCard from '../Comment';
import {List, ListItem} from 'material-ui/List';
import styles from '../graderStyles';
import RaisedButton from 'material-ui/RaisedButton';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import IconButton from 'material-ui/IconButton';
import FlipMove from 'react-flip-move';

class Robot extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let {CommentsListStyles} = GraderPanelStyles;
    return (
      <div style={CommentsListStyles.robotContainer}>
        <img style={CommentsListStyles.robot} {...this.props} src="images/helpful-robot.png" />
        <p style={CommentsListStyles.robotText}>
          {`GeniusBot says,`} <br />
          {`"Hi! I noticed you haven't`} <br />
          {`added a comment yet.`} <br />
          {`Try it out: your students` <br/>
          {`will love you!"`} <br />
        </p>
      </div>
    )
  }
}

export default class CommentsList extends Component {
  constructor(props){
    super(props);
    this.state={
      isFetching: props.commentsList.isFetching,
      commentCollection: props.commentCollection || []
    }
    this.renderRefreshIndicator = this.renderRefreshIndicator.bind(this);
    this.renderCommentsList = this.renderCommentsList.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      isFetching: nextProps.commentsList.isFetching,
      commentCollection: nextProps.commentCollection,
      studentId: nextProps.studentId,
      assessmentId: nextProps.assessmentId,
      failed: nextProps.commentsList.failed
    })
  }
  renderCommentsList(){
    let {CommentsListStyles} = GraderPanelStyles;
    let robot = !this.state.commentCollection.length ? (
      <Robot key={999} style={CommentsListStyles.robot} />
    ) : null;
    let commentCollection = this.state.commentCollection.map((contents, index) => {
      return (
        <CommentCard
        key={index}
        commentIndex={contents.commentIndex}
        contents={contents}
        studentId={this.state.studentId}
        assessmentId={this.state.assessmentId}
        >
        </ CommentCard>
      )
    })
    return (
      <List>
      <FlipMove easing="cubic-bezier(0.4, 0.0, 0.2, 1)" >
          {commentCollection}
          {robot}
      </FlipMove>
      </List>
    )
  }
  renderRefreshIndicator(){
    let refreshStatus = this.state.isFetching ? 'loading' : 'hide';
    return (
        <RefreshIndicator
          size={100}
          left={0}
          top={0}
          loadingColor={"#FF9800"}
          status={refreshStatus}
          style={GraderPanelStyles.CommentsListStyles.refresh}
        />

    )
  }
  render(){
    let {CommentsListStyles} = GraderPanelStyles;
    if(this.state.isFetching === true){
      return (
        <div style={ {textAlign: 'center'} }>
          {this.renderRefreshIndicator()}
        </div>
      )
    } else if(this.state.failed === true) {
      return (
        <IconButton>
          <ErrorIcon />
        </IconButton>
      )
    } else if (this.state.studentId && this.state.assessmentId) {
      return (
        <div>
          {this.renderCommentsList()}
        </div>
      )
    } else {
      return (null)
    }
  }
}
