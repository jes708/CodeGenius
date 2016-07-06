'use strict';
import React from 'react';
import styles from '../graderStyles';
import RaisedButton from 'material-ui/RaisedButton';
import {Tags} from '../../containers/Tag';
import MarkdownWrapper from '../../containers/Markdown';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';



export default function renderComment () {
    let {contents, isEditing} = this.state;
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
            <pre>
              {/*contents.selection.toString()*/}
              {contents.annotation && contents.annotation.selectionString ? contents.annotation.selectionString : null}
            </pre>
            {/*<TextField
            hintText="Annotate Code"
            defaultValue = {contents.selection.toString()}
            floatingLabelText="Code Annotation"
            multiLine={true}
             />*/}
          </div>
          < FlatButton href="/grade">Go to Code</ FlatButton>
        </div>
      ) }
        </span>
        <span key={id++}>
      { (!contents.criteria && isEditing) ? <RaisedButton style={buttonStyle} label="Add Criteria" /> : contents.criteria }
        </span>
        <span key={id++}>
      { (!contents.markdown && isEditing) ? <RaisedButton style={buttonStyle} label="Add Markdown" onClick={openDialog}  /> : (
        <div>
          <MarkdownWrapper markdown={contents.markdown} editable={isEditing}  />
        </div>
      ) }
        </span>
        <span>

        </span>
      </div>)

  }

function openDialog(element, nestedItems="<p>hmm... something isn't right</>", actions, onRequestClose){
  return (
    <Dialog
    actions={actions}
    modal={false}
    open={true}
    onRequestClose={onRequestClose}
    >
      {nestedItems}
    </Dialog>
  )
}

function closeDialog(){

}
