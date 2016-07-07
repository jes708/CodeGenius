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

class Comment extends Component {
  constructor(props){
    super(props);
    this.buttonOnClickHandler = this.editMode.bind(this);
    this.onClickDoneHandler = this.editModeDone.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.state = {
      contents: this.props.contents
    }
    this.renderComment = renderComment.bind(this);
    this.editMode = this.editMode.bind(this);
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

  deleteComment(){
    let studentId = this.props.studentId;
    let assessmentId = this.props.assessmentId;
    this.props.dispatch(deleteComment(this.props.commentIndex, studentId, assessmentId));
  }

  editMode(){
    this.props.dispatch({type: 'COMMENT_EDIT_START', payload: {key: this.props.commentIndex}})
  }
  editModeDone(){
    this.props.dispatch(updateComment(this.state.contents, this.props.commentIndex));
  }
  handleUpdateComment(commentState){
    this.setState({contents: commentState});
  }

  render(){
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="edit comment"
        tooltipPosition="bottom-left"
        onClick={this.buttonOnClickHandler}
      >
        <ModeEdit color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );
    return (
      <Card key={0}  style={styles.skinny} >
        <ListItem primaryText={this.props.contents.title} initiallyOpen={true} primaryTogglesNestedList={true}  rightIconButton={!this.props.isEditing ? iconButtonElement : <FlatButton onClick={this.onClickDoneHandler}>Done</FlatButton> } nestedItems = {[
          <CardText key={0} expandable={true} style={styles.noTopPadding}>
            <hr style={styles.skinny} />
            {/*this.renderComment()*/}
            <RenderComment
              contents={this.state.contents}
              isEditing={this.state.isEditing}
              handleUpdateComment={this.handleUpdateComment.bind(this)}
            />
          </CardText>
        ]}>
        </ListItem>
        {
          this.state.isEditing ? (
            <FlatButton onClick={this.deleteComment}>
              Delete
            </FlatButton>
          ) : ("")
        }
      </Card>
    )
  }
}

const mapStateToProps = (state, props) => {
  let nextProps = {contents: {}};
  let stateToUpdate = Object.assign({}, state);

  let thisComment = stateToUpdate.comment.collection.find( comment => comment.commentIndex === props.commentIndex);

  // nextProps.contents = thisComment;

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

  return nextProps;
}

export default connect(mapStateToProps)(Comment)
