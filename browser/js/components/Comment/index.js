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
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {List, ListItem} from 'material-ui/List';

const styles = {
  paperStyle: {
    height: '100%',
    overflow: 'scroll'
  },
  content: {
    padding: 16
  },
  gradingPane: {
    backgroundColor: '#64B5F6'
  },
  skinny: {
    margin: 0,
    marginBottom: 15
  },
  noTopPadding: {
    paddingTop: 0
  },
  infoCard: {
    backgroundColor: '#1E88E5'
  },
  gradingPane: {
    backgroundColor: '#64B5F6'
  },
  gradingInfo: {
    color: '#FFF',
    padding: 16
  },
  gradingTitle: {
    fontSize: 24,
    fontWeight: '400'
  },
  gradingSubtitle: {
    fontSize: 16,
    color: '#F5F5F5',
    fontWeight: '300'
  },
  assessmentButtons: {
    margin: 5
  }
}
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
  criteria: criteria,
  markdown: "blah blah blah"
}

class Comment extends Component {
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.contents) {
      let { contents } = nextProps;
      this.contents = contents;
    }
  }
  renderComment () {
    let contents = this.props.contents || defaultContents ;
    let buttonStyle = styles.assessmentButtons;
    let code = ( <div>
      { !contents.description ? <RaisedButton style={buttonStyle} label="Add Description" /> : "" }
      { !contents.score ? <RaisedButton style={buttonStyle} label="Add Score" /> : ""}
      { !contents.solutionCodeLink ? <RaisedButton style={buttonStyle} label="Add Solution Code" /> : ""}
      { !contents.tags ? <RaisedButton style={buttonStyle} label="Add Tag" /> : ""}
      { !contents.attachments ? <RaisedButton style={buttonStyle} label="Add Attachment" /> : ""}
      { !contents.selection ? <RaisedButton style={buttonStyle} label="Add Annotation" /> : (
        <div>
        <div>
          <TextField
          hintText="Annotate Code"
          defaultValue = {contents.selection.toString()}
          floatingLabelText="Code Annotation"
          multiLine={true}
           />
          <br />
        </div>
        < FlatButton href="/grade">Go to Code</ FlatButton>
        </div>

      ) }
      { !contents.criteria ? <RaisedButton style={buttonStyle} label="Add Criteria" /> : contents.criteria }
      { !contents.markdown ? <RaisedButton style={buttonStyle} label="Add Markdown" /> : (<TextField
      hintText="Add a comment"
      defaultValue = {contents.markdown}
      floatingLabelText="Instructor Comments"
      multiLine={true}
       />)
      }

      </div>)

    return code;

  }
  render(){
    return (
      <ListItem >
        <Card style={styles.skinny}>
          <CardHeader
            title={this.props.contents.title}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={styles.noTopPadding}>
            <hr style={styles.skinny} />
            {this.renderComment()}
          </CardText>
        </Card>
      </ListItem>
    )
  }
}

const mapStateToProps = (state, props) => {
  const annotation = state.annotation;
  debugger;
  if(annotation.selectionString != ""){
    let contents = Object.assign( {}, props.contents, { selection: annotation.selection } )
    return {
      contents
    }
  } else {
    return Object.assign( {}, props.contents );
  }
}

export default connect(mapStateToProps)(Comment)
