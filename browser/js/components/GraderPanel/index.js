'use strict'

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import CommentCard from '../Comment';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux';


function buildGraderPanel(dispatch){
  return dispatch({type: 'COMMENT_EDIT_DONE', payload: {key: null} })
}

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



class GraderPanel extends Component {

  constructor(props){
    super(props)

  }

  componentWillMount(){
    console.log(this);
    buildGraderPanel(this.props.dispatch);
  }

  renderCards (comments = SAMPLE_SPEC) {
    var self = this;
    return comments.map((contents, index) => {
        return (
          <CommentCard  key={index} currentKey={index} contents={contents} onClick={function(){console.log('howdy')}} {...self.props}  >
          </ CommentCard>
        )
    })
  render () {
    return (
      <div style={Object.assign(styles.gradingPane, styles.paperStyle)}>
        <div style={styles.content}>
          <Card style={Object.assign(styles.infoCard, styles.skinny)}>
            <div style={styles.gradingInfo}>
              <div style={styles.gradingTitle}>Assessment 3 - Express/Sequelize</div>
              <a style={styles.gradingSubtitle} href='https://github.com/FullstackAcademy/checkpoint-express-sequelize'>
                GitHub Repo
              </a>
            </div>
            <CardActions>
              <FlatButton
                label='Previous Student'
                hoverColor={'#2196F3'}
                rippleColor={'#90CAF9'}
                style={{color: '#F5F5F5'}}
              />
              <FlatButton
                label='Next Student'
                hoverColor={'#2196F3'}
                rippleColor={'#90CAF9'}
                style={{color: '#F5F5F5'}}
              />
            </CardActions>
          </Card>
          <RaisedButton
            label='Add Question'
            primary={true}
            icon={<FontIcon className='fa fa-plus' />}
            style={styles.skinny}
          />
          <List>
            {this.props.comments.map((contents, index) => {
                return (
                  <CommentCard key={index} contents={contents} commentIndex={index}  >
                  </ CommentCard>
                )
            })}
          </List>
        </div>
      </div>
    )
  }
