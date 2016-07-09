'use strict';

import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import StudentViewComments from './StudentViewComments';
import { Toolbar } from 'material-ui/Toolbar';
import { Tab, Tabs } from 'material-ui/Tabs';
import GraderAssessments from './GraderAssessments';
import GraderStudents from './GraderStudents';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import AnnotationHandler from './Annotator';
import GraderView from './GraderView'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { switchAssessment } from '../actions/assessmentActions'
import { getOwnStudentTest, getStudentTestByStudentId } from '../actions/studentTestInfoActions'
import { getStudentTestById } from '../reducers/studentTestInfo'
import AssessmentCard from './AssessmentCard'
import styles from './graderStyles'

const ManageStudentTest = ({comments}) => {
  if (comments) {
    let score = 0
    Object.keys(comments).forEach(key => {
      score += comments[key].score
    })
    return (
      <div style={{...styles.gradingPane, ...styles.paperStyle}}>
        Your score: {score}
      </div>
    )
  } else {
    return <div></div>
  }
}

class GradeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      current: 'Panel'
    }
  }

  switcher() {
    const { comments } = this.props.studentTest
    switch (this.state.current) {
      case 'Panel':
        return (
          <div>
            {this.props.studentTest.assessment
              ? <AssessmentCard
                assessment= {this.props.studentTest.assessment}
                editable={false}
                showTeam={false}
                showUrl={false}
                />
              :null
            }
            <ManageStudentTest comments={this.props.studentTest.comments} />
            <StudentViewComments comments={this.props.studentTest.comments} />
          </div>
        );
    }
  }

  render () {
      return (
          <div className={this.props.className}>
            <Paper style={styles.panelStyle}>
              <Tabs zDepth={3} style={styles.menu} value={'Panel'}>
                <Tab
                  value={'Panel'}
                  icon={<ActionAssignmentTurnedIn />}
                />
              </Tabs>
              <div style={styles.panel}>
                {this.switcher()}
              </div>
            </Paper>
          </div>
      )

  }
}

class Grade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      content: ''
    }
  }

  componentWillMount() {
    const {studentTestId} = this.props.params
    this.props.dispatch(getStudentTestByStudentId())
  }

  renderMain() {
    if(this.props.studentTest) {
      return (
        <div>
          <div className='col-lg-8'>
            <GraderView />
          </div>
          <div className='col-lg-4'>
            <GradeView studentTest={this.props.studentTest} />
          </div>
        </div>
      )
    }
  }

  render(){
    return (
      <div style={styles.main}>
        {this.renderMain()}
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => {
  // const { studentTest } = state.studentTestInfo
  return {
    params,
    studentTest: getStudentTestById(state.studentTestInfo.studentTestsById, params.studentTestId)
  }
}

export default withRouter(connect(mapStateToProps)(Grade))
