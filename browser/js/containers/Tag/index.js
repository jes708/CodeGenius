'use strict';

import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
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

export class Tags extends Component{
  constructor(props){
    super(props);
    let tagId = 0;
    this.state = {
      isEditing: this.props.isEditing
    }
    this.state.tags = this.props.tags.map( tag => {
      tag.id = tagId++
      return tag;
    })
    this.addTag = this.addTag.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitNewTag = this.submitNewTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getTags = this.getTags.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.state = {
      tags: nextProps.tags,
      isEditing: nextProps.isEditing
    }
  }
  addTag(){
    this.setState({open: true});
  };
  handleClose(){
    this.setState({open: false});
    this.setState({textAreaValue: ""})
  };
  handleChange(e){
    this.setState({textAreaValue: e.target.value })
  }
  deleteTag(index, tags){
      let currentTags = tags();
      const tagToDelete =
        currentTags.map((tag) => {return tag.id}).indexOf(index);
      let nextTags = currentTags.slice();
      nextTags.splice(tagToDelete, 1);
      this.setState({tags: nextTags})
  };
  getTags(){
    return this.state.tags;
  }
  submitNewTag(){
    let nextTags = this.state.tags.slice()
    nextTags.push({name: this.state.textAreaValue})
    this.setState({tags: nextTags})
    this.handleClose();
  }
  render(){
    const addTagActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Add Tag"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submitNewTag}
      />
    ]
    let that = this;
    return (
        <div >
          <FlipMove style={styles.tags} easing="cubic-bezier(0.4, 0.0, 0.2, 1)">
            {this.state.tags ? (
              this.state.tags.map((tag, i) => {
                let thisTagStyle = _.cloneDeep(this.state.tagStyle);
                return (

                  <Tag
                    key={tag.id}
                    tag={tag}
                    tagStyle={styles.tag}
                    deleteTag={ this.deleteTag.bind(that, tag.id, this.getTags) }
                  />
                )
              })
            )  : (null)}
            <div>
            {
              this.state.isEditing ? (
                <span>
                <IconButton style={styles.addTag} onClick={this.addTag} >
                < AddCircleOutline color={grey400} hoverColor={lightBlack} style={ styles.addTagIcon }  />
                </IconButton>
                <Dialog
                actions={addTagActions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                >
                <TextField value={this.state.textAreaValue} floatingLabelText="Add a Tag" onChange={this.handleChange} />
                </Dialog>
                </span>
              ) : (null)
            }
            </div>
          </FlipMove>
        </div>
    )
  }
}

class Tag extends Component{
  constructor(props){
    super(props)
    let tagStyle = this.props.tagStyle;
    tagStyle.opacity = 0;
    this.state = {
      tagName: this.props.tag.name,
      opacity: 0,
      backgroundColor: this.props.tag.color,
      deleteTag: this.props.deleteTag
    }
    this._animate = new ReactStateAnimation(this);
  }

  componentDidMount(){
    setTimeout(()=>{
      this._animate.cubicInOut( 'opacity', 1, 550 )
    },
      225 * this.state.key
    )
  }
  fadeOut(){
    return this._animate.cubicInOut( 'opacity', 0, 550 )
  }
  getStyle(){
    let style = this.props.tagStyle;
    style.opacity = this.state.opacity;
    return style;
  }
  render(){
    return(
      <Chip
          style={this.getStyle()}
          backgroundColor={this.state.backgroundColor}
          onRequestDelete={() => this.state.deleteTag() }
      >
        {this.state.tagName}
      </Chip>
    )
  }
}
