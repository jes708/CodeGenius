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
  // description: "foo bar",
  // score: 1,
  // solutionCodeLink: "http://www.google.com",
  // tags: ['foo', 'bar', 'baz'],
  // attachments: ['foo', 'bar', 'baz'],
  // annotation: null,
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
    this.state = {
      contents: this.props.contents
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.contents) {
      let { contents } = nextProps;
      this.state.contents = contents;
    }
  }
  renderComment () {
    let contents = this.state.contents || defaultContents;
    let isEditing = this.props.isEditing;
    let buttonStyle = styles.assessmentButtons;
    let id = 0;
    return ( <div>
        <span key={id++}>
      { (!contents.description && isEditing) ? <RaisedButton style={buttonStyle} label="Add Description" /> : "" }
        </span>
        <span key={id++}>
      { (!contents.score && isEditing) ? <RaisedButton style={buttonStyle} label="Add Score" /> : ""}
        </span>
        <span key={id++}>
      { (!contents.solutionCodeLink && isEditing) ? <RaisedButton style={buttonStyle} label="Add Solution Code" /> : ""}
        </span>
        <span key={id++}>
      { (!contents.tags && isEditing) ? <RaisedButton style={buttonStyle} label="Add Tag" /> : (
        <div>
          <Tags tags={contents.tags} isEditing={isEditing} />
        </div>
      )
      }
        </span>
        <span key={id++}>
      { (!contents.attachments && isEditing) ? <RaisedButton style={buttonStyle} label="Add Attachment" /> : ""}
        </span>
        <span key={id++}>
      { (!contents.selection) ? (isEditing ? <RaisedButton style={buttonStyle} label="Add Annotation" /> : "") : (
        <div>
          <div>
            <TextField
            hintText="Annotate Code"
            defaultValue = {contents.selection.toString()}
            floatingLabelText="Code Annotation"
            multiLine={true}
             />
          </div>
          < FlatButton href="/grade">Go to Code</ FlatButton>
        </div>
      ) }
        </span>
        <span key={id++}>
      { (!contents.criteria && isEditing) ? <RaisedButton style={buttonStyle} label="Add Criteria" /> : contents.criteria }
        </span>
        <span key={id++}>
      { (!contents.markdown && isEditing) ? <RaisedButton style={buttonStyle} label="Add Markdown" /> : (
        <div>
          <MarkdownWrapper markdown={contents.markdown} editable={isEditing}  />
        </div>
      ) }
        </span>
      </div>)

  }
  editMode(){
    this.props.dispatch({type: 'COMMENT_EDIT_START', payload: {key: this.props.commentIndex}})
  }
  editModeDone(){
    this.props.dispatch({type: 'COMMENT_EDIT_DONE', payload: {key: null}})
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
      <Card key={1}  style={styles.skinny} >
        <ListItem primaryText={this.props.contents.title} initiallyOpen={true} primaryTogglesNestedList={true}  rightIconButton={!this.props.isEditing ? iconButtonElement : <FlatButton onClick={this.onClickDoneHandler}>Done</FlatButton> } nestedItems = {[
          <CardText expandable={true} style={styles.noTopPadding}>
            <hr style={styles.skinny} />
            {this.renderComment()}
          </CardText>
        ]}>
        </ListItem>
      </Card>
    )
  }
}

const mapStateToProps = (state, props) => {
  let nextProps = Object.assign( {}, props.contents);

  nextProps.isEditing = state.comment.isEditing.key === props.commentIndex ? true : false;

  if(state.annotation.selectionString != ""){
    nextProps.selection = annotation.selection
  }
  return nextProps;
}

export default connect(mapStateToProps)(Comment)
