'use strict';

import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { connect } from 'react-redux';

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
  }
}

class Comment extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.onClick = () => this.props.dispatch(testAction())
  }
  render(){
    return (
      <Card style={styles.skinny}>
        <CardHeader
          title={this.props.title}
          subtitle={this.props.spec}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true} style={styles.noTopPadding}>
          <hr style={styles.skinny} />
          {this.props.renderCriterion()}
        </CardText>
        <CardActions expandable={true}>
          <FlatButton
            label='Add Criterion'
            icon={<FontIcon className='fa fa-plus' />}
          />
          <FlatButton
            label='Add Comment'
            icon={<FontIcon className='fa fa-pencil' />}
          />
        </CardActions>
      </Card>
    )
  }
}

function testAction(){
  return {
    type: 'TEST_ACTION',
    payload: {
      text: "Now I've got something!"
    }
  }
}

const initialState = {
  text: ["I've got plenty of nuthin', and nuthin's plenty for me."]
}

const ActionTypes = {
  TEST_ACTION: 'TEST_ACTION'
}

export function CommentReducer( state=initialState, action){
  if(action.type === ActionTypes.TEST_ACTION){
    let newText = state.text.concat([{text: action.payload.text}])
    return {text: newText}
  }
  return state;
}

const mapStateToProps = (state) => {
  return {
    text: state.text
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
    // onSelection: (_selection) => dispatch(selection(_selection)),
    // onAnnotation: (_selection, _annotation) => dispatch(annotation(_selection, _annotation))
  }
}

export default connect(mapStateToProps)(Comment)
