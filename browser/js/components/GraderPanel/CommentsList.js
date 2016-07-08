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


export default class CommentsList extends Component {
  constructor(props){
    super(props);
    this.state={
      isFetching: props.commentsList.isFetching,
      commentCollection: props.commentCollection
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
    return (
      <List>
      {(this.state.commentCollection.length) ? (
        this.state.commentCollection.map((contents, index) => {
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
        })) : (
          <RaisedButton>Add a comment!</RaisedButton>
        )
      }
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
