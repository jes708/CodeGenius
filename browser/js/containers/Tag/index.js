'use strict';

import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip'
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import styles from '../../components/graderStyles';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';



export class Tags extends Component{
  constructor(props){
    super(props);
    this.state = {
      tags: this.props.tags,
      isEditing: this.props.isEditing
    }
    this.addTag = this.addTag.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitNewTag = this.submitNewTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  deleteTag(index, tag){
    console.log('deleting ', index)
    let nextTags = this.state.tags.slice()
    nextTags.splice(index.i, 1);
    this.setState({tags: nextTags});
    // return ()=>alert(`deleting tag ${index.i} ${tag.tag.name}`)
  };
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
    return (
      <div style={styles.tags}>
          {this.state.tags ? (
            this.state.tags.map((tag, i) => {
              let thisTagStyle = _.cloneDeep(this.state.tagStyle);
              return (<Chip key={i} tag={tag.name} style={styles.tag} onRequestDelete={ ()=>this.deleteTag({i}, {tag})} backgroundColor={tag.color} >{tag.name}</Chip>)
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
      </div>
    )
  }
}
