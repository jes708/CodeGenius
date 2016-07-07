'use strict';
import React, {Component} from 'react';
import styles from '../graderStyles';
import RaisedButton from 'material-ui/RaisedButton';
import {Tags} from '../../containers/Tag';
import MarkdownWrapper from '../../containers/Markdown';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';

export default class RenderComment extends Component {
  constructor(props){
    super(props);
    let {contents, isEditing} = props;
    this.state = {
      contents,
      isEditing,
      dialog: {
        title: "",
        actions: [],
        open: false
      }
    }
    this.updateContents = this.updateContents.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.renderDialog = this.renderDialog.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.handleSubmitDialog = this.handleSubmitDialog.bind(this);
    this.renderMarkdown = this.renderMarkdown.bind(this);
    this.renderScore = this.renderScore.bind(this);
  }
  componentWillReceiveProps(nextProps){
    let {contents, isEditing} = nextProps;
    this.setState({
      contents,
      isEditing
    })
  }
  renderComment = renderComment;
  toggleDialog(){
    let nextDialog = Object.assign({}, this.state.dialog, {open: !this.state.dialog.open})
    this.setState({
      dialog: nextDialog
    })
  }
  renderDialog({title, actions, nested, handles}){
    let nextDialog = Object.assign({}, this.state.dialog, {
      title,
      nested,
      handles,
      open: !this.state.dialog.open
    })
    return ()=> {
      this.setState({
        dialog: nextDialog
      })
    }
  }
  handleSlider(event, value){
    this.updateContents({score: value});
  }
  renderScore(){
    let {contents, isEditing} = this.state;
    let buttonStyle = styles.assessmentButtons;
    return (
      <div>
        <p>
          {(contents.score) ? (<span>Score: {contents.score}</span>) : null }
        </p>
        <div>
        {(
          isEditing ? (
            <span>
              <p>Set a score for this comment</p>
              <span>0</span>
              <Slider
              max={5}
              min={0}
              step={0.5}
              defaultValue={contents.score || 1}
              value={contents.score}
              onChange={
                this.handleSlider.bind(this)
              }
              />
              <span>5</span>
            </span>
          ) : (null)
        )}
        </div>
      </div>
    )
  }
  renderMarkdown(){
    let {contents, isEditing} = this.state;
    let buttonStyle = styles.assessmentButtons;
    return (
      <span>
    { (!contents.markdown && isEditing) ? <RaisedButton style={buttonStyle} label="Add Markdown" onClick={
      this.renderDialog(
        {
          title: "Add Markdown",
          nested: (
            <div>
              <MarkdownWrapper
                handleOnBlur={(event, updateContents = this.updateContents) => {
                  console.log('calling handler', event.target.value);
                  updateContents({markdown: event.target.value})
                }}
                markdown={"#Add Markdown here"}
                editable={true}
                />
            </div>
          )
        }
      )
    }  /> : (
      <div>
        <MarkdownWrapper
          markdown={contents.markdown}
          handleOnChange={
            (event, updateContents = this.updateContents) => {
              updateContents({markdown: event.target.value})
            }
          }
          editable={isEditing}  />
      </div>
    ) }
    </span>
    )
  }
  handleSubmitDialog(){
    this.toggleDialog();
  }
  updateContents(contentsToUpdate){
    let newContents = Object.assign({}, this.state.contents);
    let updatedContents = Object.assign(newContents, contentsToUpdate);
    this.state.contents = updatedContents;
    this.props.handleUpdateComment(this.state.contents);
  }
  render(){
    return (
      <span>
        {this.renderComment()}
      </span>
    )
  }
}

export default function renderComment () {
    let {contents, isEditing} = this.state;
    let buttonStyle = styles.assessmentButtons;
    let id = 0;
    return (
      <div>
        <span key={id++} >
          {this.renderMarkdown()}
        </span>
        <span key={id++}>
          {this.renderScore()}
        </span>
        <span key={id++}>
          {/* (!contents.solutionCodeLink && isEditing) ? <RaisedButton style={buttonStyle} label="Add Solution Code" /> : "" */}
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
          {/* (!contents.attachments && isEditing) ? <RaisedButton style={buttonStyle} label="Add Attachment" /> : ""*/}
        </span>
        <span key={id++}>
          { (!contents.selection) ? (isEditing ? <RaisedButton style={buttonStyle} label="Add Annotation" /> : "") : (
        <div>
          <div>
            <pre>
              {contents.annotation && contents.annotation.selectionString ? contents.annotation.selectionString : null}
            </pre>
          </div>
          {/*< FlatButton href="/grade">Go to Code</ FlatButton>*/}
        </div>
      ) }
        </span>
        <span key={id++}>
      {/* (!contents.criteria && isEditing) ? <RaisedButton style={buttonStyle} label="Add Criteria" /> : contents.criteria */}
        </span>
        <span>
          <Dialog
            modal={false}
            open={this.state.dialog.open}
            actions={[
              <RaisedButton onClick={this.handleSubmitDialog}>Done</RaisedButton>
            ]}
            title={this.state.dialog.title}
          >
            {this.state.dialog.nested}
          </Dialog>
        </span>
      </div>)

  }
