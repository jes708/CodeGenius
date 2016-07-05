'use strict'

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import CommentCard from '../Comment';
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux';
import styles from '../graderStyles';
import {getComments, postComment} from '../Comment/apiActions';


function buildGraderPanel(dispatch){
  return dispatch({type: 'COMMENT_EDIT_DONE', payload: {key: null} })
}

export default class GraderPanel extends Component {

  constructor(props){
    super(props)
    this.getComments();
    this.createNewComment = this.createNewComment.bind(this);
    this.state = {
      commentCollection: []
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('adding props', nextProps)
    this.setState({
      commentCollection: nextProps.commentCollection
    })
    console.log('updated state', this.state.commentCollection);
  }

  componentWillMount(){
    buildGraderPanel(this.props.dispatch);
  }

  createNewComment(){
    this.props.dispatch(postComment({}));
  }

  getComments(){
    this.props.dispatch(getComments());
  }

  render () {
    return (
      <div style={Object.assign({}, styles.gradingPane, styles.paperStyle)}>
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
            label='Add Comment'
            primary={true}
            icon={<FontIcon className='fa fa-plus' />}
            style={styles.skinny}
            onClick={this.createNewComment}
          />
          <List>
              {(this.state.commentCollection.length) ? (
                this.state.commentCollection.map((contents, index) => {
                    return (
                      <CommentCard
                        key={index}
                        commentIndex={contents.commentIndex}
                        contents={contents}
                          >
                      </ CommentCard>
                    )
                  })) : (
                    <h2>Add a comment!</h2>
                  )
              }
          </List>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  const { comment } = state

  return {
    commentCollection: comment.collection ? state.comment.collection.map( comment => comment ) : null
  }
}

export default connect(mapStateToProps)(GraderPanel)
