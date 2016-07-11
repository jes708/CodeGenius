'use strict';

import React, { Component, PropTypes, Children } from 'react';
import IconButton from 'material-ui/IconButton';
import {grey400, darkBlack, lightBlack, red500, green500, blue500, orange500, yellow500} from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import styles from '../../components/graderStyles';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ReactStateAnimation from 'react-state-animation';
import {cloneDeep as _cloneDeep} from 'lodash';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';
import * as api from './apiActions';
import Label from 'material-ui/svg-icons/action/label';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RemoveContent from 'material-ui/svg-icons/content/remove-circle';

const colors = [
  ['Red', red500],
  ['Green', green500],
  ['Blue', blue500],
  ['Orange', orange500],
  ['Yellow', yellow500]
]

const colorMenuItems = colors.map(
  (color, index) => (
    <MenuItem
      key={index}
      primaryText={color[0]}
      value={color[1]}
      rightIcon={<Label color={color[1]}
      />}
    />
  )
)

const TagsHandlerWrapper = (propsToReceive) => (WrappedComponent) => {
  class TagsHandler extends Component {
    constructor(props){
      super(props);


      this.openTagDropdown = this.openTagDropdown.bind(this);
      this.getCommentTags = this.getCommentTags.bind(this);
      this.toggleTagSelectorDropdown = this.toggleTagSelectorDropdown.bind(this);
      this.createTag = this.createTag.bind(this);
      this.deleteTag = this.deleteTag.bind(this);
      this.addTagToComment = this.addTagToComment.bind(this);
      this.removeTagFromComment = this.removeTagFromComment.bind(this);
      this.toggleCreateTagDialog = this.toggleCreateTagDialog.bind(this);
      this.submitTagFromDialog = this.submitTagFromDialog.bind(this);
      this.cancelNewTagFromDialog = this.cancelNewTagFromDialog.bind(this);
      this.handleTypeName = this.handleTypeName.bind(this);
      this.handleChooseColor = this.handleChooseColor.bind(this);
      this.getCommentTags = this.getCommentTags.bind(this);
      this.renderDialog = this.renderDialog.bind(this);
      this.populateTagDropdown = this.populateTagDropdown.bind(this);
      this.getTagList = this.getTagList.bind(this);
      this.selectTagFromDropdown = this.selectTagFromDropdown.bind(this);


      this.state = {
        tagDialog: {
          open: false,
          name: null,
          color: blue500
        },
        tagSelector: {
          open: false,
          list: [],
          isFetching: false,
          failed: false,
          error: null,
          populatedList: []
        },
        tags: props.tags
      }

    }

    componentWillReceiveProps(nextProps){
      this.setState({
        tags: nextProps.tags,
      })
      let nextTagSelector = Object.assign({}, nextProps.tagSelector);
      nextTagSelector.open = this.state.tagSelector.open;
      this.setState({
        tagSelector: nextTagSelector
      })
    }

    // getDefaultProps(){
    //   return propsToReceive;
    // }


    //external Tag Wrapper Methods
    populateTagDropdown(){
      let {deleteTag} = this.deleteTag
      let {tagSelector} = this.state;
      const addNewTag = (
        <MenuItem
          key={0}
          primaryText={'Add New Tag'}
          rightIcon ={<AddCircleOutline /> }
          onMouseDown={this.toggleCreateTagDialog}
        />
      )
      let tagList = this.getTagList();
      let mappedTagList = tagList
        .then( function(){
          return this.props.tagSelector.list}.bind(this)  )
        .then( function(tagList){
          return tagList.map( (tag, index) => (
            <MenuItem
              key={tag.id+1}
              tagId = {index}
              primaryText={tag.name}
              value={tag.id}
              leftIcon={<Label color={tag.color} /> }
            />
          ) )
        }.bind(this) ).then( function(addNewTag, menuItemList){
          let menuItemListWithAdd = [addNewTag].concat(menuItemList);
          return menuItemListWithAdd;
        }.bind(this, addNewTag) ).then( function(menuItemListWithAdd){
          tagSelector.populatedList = menuItemListWithAdd;
          this.setState({tagSelector});
          return menuItemListWithAdd;
        }.bind(this) ).catch( function(err){return console.log('error populating tag list', err)})
        return mappedTagList;
    }
    openTagDropdown(){
      this.populateTagDropdown()
        .then( ()=> this.toggleTagSelectorDropdown() )
    }
    selectTagFromDropdown(e, key, payload){
      this.toggleTagSelectorDropdown();
      this.props.dispatch(api.addTagByCommentId(key, this.props.commentIndex))
    }

    createTag(name, color){
      let tag = {name, color}
      let {commentIndex} = this.props
      return this.props.dispatch(api.createTagByCommentId(tag, commentIndex));
    }
    deleteTag(tagId){
      return ()=>this.props.dispatch(api.deleteTag(tagId));
    }
    addTagToComment(tagId, commentIndex){
      return this.props.dispatch(api.addTagToComment(tagId, commentIndex));
    }
    removeTagFromComment(tagId, commentIndex){
      return this.props.dispatch(api.removeTagFromComment(tagId, commentIndex))
    }

    toggleCreateTagDialog(){
      let tagDialog = this.state.tagDialog;
      tagDialog.open = tagDialog.open === true ? false : true;
      this.setState({tagDialog});
    }

    submitTagFromDialog(){
      let tagDialog = this.state.tagDialog;
      let createThisTag = this.createTag(tagDialog.name, tagDialog.color)
      tagDialog.name = null;
      tagDialog.color = null;
      this.setState({tagDialog});
      this.toggleCreateTagDialog()
      return createThisTag;
    }

    cancelNewTagFromDialog(){
      let tagDialog = this.state.tagDialog;
      tagDialog.name = null;
      tagDialog.color = null;
      this.toggleCreateTagDialog()
      this.setState({tagDialog});
    }

    handleTypeName(e){
      let tagDialog = this.state.tagDialog;
      tagDialog.name = e.target.value;
      this.setState({tagDialog})
    }

    handleChooseColor(e, index, value){
      let tagDialog = this.state.tagDialog;
      tagDialog.color = value;
      this.setState({tagDialog})
    }

    getCommentTags(){
      return api.getTags(this.props.commentIndex)
    }

    //internal methods
    getTagList(){
      return this.props.dispatch(api.loadTagList())
    }
    toggleTagSelectorDropdown(){
      let nextProps = Object.assign({}, this.props);
      let tagSelector = nextProps.tagSelector;
      tagSelector.open = tagSelector.open === true ? false : true;
      tagSelector.populatedList = this.state.tagSelector.populatedList;
      this.setState({tagSelector});
    }

    renderDialog(){
      let tagDialogOpen = this.state.tagDialog.open;
      const addTagActions = [
        <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.cancelNewTagFromDialog}
        />,
        <FlatButton
        label="Add Tag"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submitTagFromDialog}
        />
      ]
      return (
        <Dialog
        actions={addTagActions}
        modal={false}
        open={tagDialogOpen}
        >
          <TextField value={this.state.tagDialog.name} floatingLabelText="Add a Tag" onChange={this.handleTypeName} />
          <DropDownMenu
          value={this.state.tagDialog.color}
          floatingLabelText="Choose Color"
          children={colorMenuItems}
          onChange={this.handleChooseColor}
          />
        </Dialog>
      )
    }
    render(){
      let tagMethods = {
        getCommentTags: this.getCommentTags,
        createTag: this.createTag,
        deleteTag: this.deleteTag,
        toggleCreateTagDialog: this.toggleCreateTagDialog,
        openTagDropdown: this.openTagDropdown,
        addTagToComment: this.addTagToComment,
        removeTagFromComment: this.removeTagFromComment,
        toggleTagSelectorDropdown: this.toggleTagSelectorDropdown,
        selectTagFromDropdown: this.selectTagFromDropdown
      }
      return (
        <div>
          <WrappedComponent {...this.props} tagMethods={tagMethods} tagSelector={this.state.tagSelector} />
          {this.renderDialog()}
          </div>
        )
    }
  }

  TagsHandler.propTypes = {
    tags: PropTypes.array.isRequired,
    studentId: PropTypes.number.isRequired,
    assessmentId: PropTypes.number.isRequired,
    commentIndex: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    isEditing: PropTypes.bool
  }

  const mapStateToProps = (state, props) => {
    let thisComment =
      state.comment
           .collection
           .find( comment => {
             return comment.commentIndex === props.commentIndex
           } )
    let tags = thisComment.tags || [];
    let nextProps = Object.assign({}, props);
    nextProps.tags = tags;
    nextProps.tagSelector = state.comment.allTags;
    return nextProps;
  }

  return connect(mapStateToProps)(TagsHandler)

}

export default TagsHandlerWrapper
