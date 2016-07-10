'use strict';

import React, {Component} from 'react';
import styles from '../graderStyles';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
//Replace the buttons with these icons.  Use tooltips to clarify what each button does

import SvgIcon from 'material-ui/SvgIcon';
import AddAttachment from 'material-ui/svg-icons/editor/attach-file'; //Add Attachment
import AddTag from 'material-ui/svg-icons/action/label'; //Add Tag
import AddScore from 'material-ui/svg-icons/image/exposure-plus-1'; //Add Score
import AddAnnotation from 'material-ui/svg-icons/editor/insert-comment'; //Add Description (Maybe change to Add Comment)
import AddCriteria from 'material-ui/svg-icons/action/list'; //Add Criteria
import AddSolutionCode from 'material-ui/svg-icons/av/playlist-add'; //Add Solution Code
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import commentStyles from './styles';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';

class AddMarkdown extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      < SvgIcon viewBox="0 0 1024 1024" {...this.props} >
        <path d="M950.154 192H73.846C33.127 192 0 225.12699999999995 0 265.846v492.308C0 798.875 33.127 832 73.846 832h876.308c40.721 0 73.846-33.125 73.846-73.846V265.846C1024 225.12699999999995 990.875 192 950.154 192zM576 703.875L448 704V512l-96 123.077L256 512v192H128V320h128l96 128 96-128 128-0.125V703.875zM767.091 735.875L608 512h96V320h128v192h96L767.091 735.875z"/>
      </SvgIcon>
    )
  }
}




export default class CommentToolbar extends Component{
  constructor(props){
    super(props);
    console.log('toolbar props', props);
    let contents = props.contents
    this.state = {
      buttons: {
        Markdown: {exists: contents.markdown },
        Score: {exists: contents.score},
        Annotation: {exists: contents.annotation},
        Tag: {exists: contents.tags.length !== 0 ? true : false},
        "Solution Code": {exists: contents.solutionCodeLink}
      }
    }
    this.AddButtonWithBadge.bind(this);
  }
  componentWillReceiveProps(nextProps){
    let {contents} = nextProps;
    this.setState({
      buttons: {
        Markdown: {exists: contents.markdown },
        Score: {exists: contents.score},
        Annotation: {exists: contents.annotation},
        Tag: {exists: contents.tags.length !== 0 ? true : false },
        "Solution Code": {exists: contents.solutionCodeLink}
      }
    })
  }
  AddButtonWithBadge(Child, name){
    const {tagMethods, addMarkdownHandler, editMode} = this.props;
    const {buttonAdded, badgeStyle, badgeIconStyle} = commentStyles;
    const {exists} = this.state.buttons[name];
    const {badge} = commentStyles;
    let removeItem = this.props.removeItem(name);
    let clickHandler;
    switch(name){
      case 'Markdown': clickHandler = addMarkdownHandler;
        break;
      case 'Tag':
        clickHandler = tagMethods.toggleCreateTagDialog;
        removeItem = editMode;
        break;
      default: clickHandler = editMode;
    }
    return (
      <span>
      {exists ? (
        <Badge
          badgeStyle={badge.style}
          badgeContent={
            <IconButton
              iconStyle={badge.IconStyle}
              onMouseDown={removeItem}
              tooltip={`Remove ${name}`}
            >
              <CheckCircle color={badge.exists.color} />
            </IconButton>}
          children={Child}
        />
      ) : (
        <Badge
          badgeStyle={badge.style}
          badgeContent={
            <IconButton
              iconStyle={badge.IconStyle}
              tooltip={`Add ${name}`}
              children={<AddCircleOutline color={badge.notExists.color} />}
              onMouseDown={clickHandler}
            />}
          children={Child}
        />
      )}
      </span>
    )
  }
  render(){
    var buttons = [
      [<AddMarkdown />, "Markdown"],
      [<AddScore />, "Score"],
      [<AddAnnotation />, "Annotation"],
      [<AddTag />, "Tag"],
      [<AddSolutionCode />, "Solution Code"]
    ].map( ([Element, name]) => {
      return (<ToolbarGroup>
        {this.AddButtonWithBadge(Element, name)}
      </ToolbarGroup>)
    })
    return(
      <Toolbar {...this.props}
        children={buttons}
      >
      </Toolbar>
    )
  }
}
