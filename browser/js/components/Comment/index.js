'use strict';

import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {List, ListItem} from 'material-ui/List';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import styles from '../graderStyles';
import _ from 'lodash';
import Chip from 'material-ui/Chip'
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import MarkdownWrapper from '../../containers/Markdown';
import {Tags} from '../../containers/Tag';
import FlipMove from 'react-flip-move';
import renderComment from './renderComment';
import { annotationAdded } from '../Annotator/actions';
import { deleteComment, updateComment } from './apiActions';
import RenderComment from './renderComment';
import { putStudentTestInfo } from '../../actions/studentTestInfoActions'
import TagsHandlerWrapper from '../../containers/Tag/TagsHandler';
import ActionDone from 'material-ui/svg-icons/action/done';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';

let criteria = (
<RadioButtonGroup name="criteria">
  <RadioButton
  value="1"
  label="Unbearable"
  />
  <RadioButton
  value="2"
  label="Horrible"
  />
  <RadioButton
  value="3"
  label="Acceptable"
  />
  <RadioButton
  value="4"
  label="Near Perfect"
  />
  <RadioButton
  value="5"
  label="Flawless"
  />
</RadioButtonGroup>)

let defaultContents = {
  tags: [
    {name: 'foo', color: '#3F51B5'}
  ],
  criteria: criteria,
  markdown: "blah blah blah"
}

let tagsHandlerProps = {}

class Comment extends Component {
  constructor(props){
    super(props);
    this.buttonOnClickHandler = this.editMode.bind(this);
    this.onClickDoneHandler = this.editModeDone.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.state = {
      contents: this.props.contents,
      Tag: {
        AdderOpen: false,
        textAreaValue: "",
        collection: []
      }
    }
    this.renderComment = renderComment.bind(this);
    this.editMode = this.editMode.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateContents = this.updateContents.bind(this);
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
    //tags
    this.tagMethods = {
      addTag: this.addTag.bind(this),
      handleClose: this.handleCloseTag.bind(this),
      submitNewTag: this.submitNewTag.bind(this),
      handleChange: this.handleChangeTag.bind(this),
      getTags: this.getTags.bind(this),
      toggleAddTag: this.toggleAddTag.bind(this)
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({isEditing: nextProps.isEditing});
    this.setState({contents: nextProps.contents});
    if(nextProps.contents.selection &&
       this.state.isEditing &&
       !nextProps.contents.selection.added) {

        this.setState(function(previousState, currentProps){
          let nextState = {...previousState}
          nextState.contents.selection = nextProps.contents.selection;
          return nextState;
        })
      this.props.dispatch(annotationAdded( true ));
    }
  }


//tagMethods
  addTag(){
    this.tagMethods.toggleAddTag();
  };
  toggleAddTag(){
    this.setState({Tag: {AdderOpen: !this.state.Tag.AdderOpen}});
  }
  handleCloseTag(){
    this.tagMethods.toggleAddTag();
    this.setState({Tag: {textAreaValue: ""} })
  };
  handleChangeTag(e){
    this.setState({Tag: {textAreaValue: e.target.value }})
    // dispatch update tag?
  }
  deleteTag(index, tags){
      let currentTags = tags();
      const tagToDelete =
        currentTags.map((tag) => {return tag.id}).indexOf(index);
      let nextTags = currentTags.slice();
      nextTags.splice(tagToDelete, 1);
      this.setState({Tag: {collection: nextTags}})
      // dispatch delete tag?
  };
  getTags(){
    return this.state.Tag.collection;
    // dispatch load tags?
  }
  submitNewTag(){
    let nextTags = this.state.Tag.collection.slice()
    nextTags.push({name: this.state.Tag.textAreaValue})
    this.setState({Tag: {collection: nextTags}});
    // dispatch add tag?
    this.tagMethods.handleClose();
  }

//comments
  deleteComment(){
    let studentId = this.props.studentId;
    let assessmentId = this.props.assessmentId;
    this.props.dispatch(deleteComment(this.props.commentIndex, studentId, assessmentId));
    let score = this.props.studentScore - this.props.contents.score
    this.props.dispatch(putStudentTestInfo(this.props.assessmentId, this.props.studentId, {score: score}))
  }

  editMode(){
    this.props.dispatch({type: 'COMMENT_EDIT_START', payload: {key: this.props.commentIndex}})
  }
  editModeDone(){
    // this.handleUpdateComment(this.state.contents)
    this.props.dispatch(updateComment(this.state.contents, this.props.commentIndex));
  }

  removeItem(itemName){
    return () => {
      let contentsToUpdate = {};
      contentsToUpdate[itemName.toLowerCase()] = null;
      this.updateContents(contentsToUpdate);
    }
  }
  updateContents(contentsToUpdate){
    let newContents = Object.assign({}, this.state.contents);
    let updatedContents = Object.assign(newContents, contentsToUpdate);
    this.state.contents = updatedContents; // should this be this.setState?
    this.updateTotalScore();
    this.handleUpdateComment(this.state.contents);
  }

  updateTotalScore() {
    if (this.props.allComments.length) {
      const totalScore = this.props.allComments.reduce((sum, comment) => {
        if (comment.commentIndex != this.props.commentIndex) return sum + comment.score;
        else return sum + this.state.contents.score;
      }, 0)
      this.props.dispatch(putStudentTestInfo(this.props.assessmentId, this.props.studentId, {score: totalScore}))
    }
  }

  handleUpdateComment(commentState){
    this.setState({contents: commentState});
    this.props.dispatch(updateComment(commentState, this.props.commentIndex));
  }

  render(){
    tagsHandlerProps = {
      tags: this.props.contents.tags,
      studentId: this.props.studentId,
      assessmentId: this.props.assessmentId,
      commentIndex: this.props.commentIndex,
      comment: this.state.contents,
      isEditing: this.state.isEditing
    }

    let isEditing = this.state.isEditing;

    const iconButtonElement = this.props.isEditing ? (
      <IconButton onClick={this.onClickDoneHandler} children={<ActionDone color={grey400}/>} />
    ) : (
      <IconButton
        touch={true}
        tooltip="edit comment"
        tooltipPosition="bottom-left"
        onClick={this.buttonOnClickHandler}
      >
        <ModeEdit color={grey400} />
      </IconButton>
    );
    let deleteButton = (
      isEditing ? (
        <IconButton children={<DeleteForever />} onClick={this.deleteComment} />
      ) : (null)
    )

    return (
        <Card key={0}
          style={styles.skinny}
          children = {
            <div>
              <CardText>
                <RenderComment
                  contents={this.state.contents}
                  isEditing={this.state.isEditing}
                  handleUpdateComment={this.handleUpdateComment}
                  editMode={this.editMode}
                  editModeDone={this.editModeDone}
                  removeItem={this.removeItem}
                  updateContents={this.updateContents}
                  editButton={iconButtonElement}
                  {...this.props}
                />
              </CardText>
              {deleteButton}
            </div>
          }
        />
      )
  }
}

const mapStateToProps = (state, props) => {
  let nextProps = {contents: {}};
  let stateToUpdate = Object.assign({}, state);

  let thisComment = stateToUpdate.comment.collection.find( comment => comment.commentIndex === props.commentIndex);

  nextProps.isEditing = (
    state.comment.isEditing.key === props.commentIndex ?
      true : false
    );

  nextProps.contents = Object.assign( {}, props.contents, thisComment);

  if(props.contents){
    nextProps.contents.selection = props.contents.selection || {};
    nextProps.contents.selection.added = stateToUpdate.annotation.added;
  }

  if(!!state.annotation.selectionString && nextProps.isEditing && !stateToUpdate.annotation.added){
    nextProps.contents.selection = stateToUpdate.annotation.selection;
  }

  nextProps.allComments = stateToUpdate.comment.collection;
  nextProps.studentScore = stateToUpdate.assessments.current.student.score

  return nextProps;
}

export default TagsHandlerWrapper(tagsHandlerProps)(connect(mapStateToProps)(Comment))
