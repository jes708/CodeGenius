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
import { getOwnStudentTest } from '../actions/studentTestInfoActions'
import AssessmentCard from './AssessmentCard'

const styles = {
  main: {
    paddingTop: 20
  },
  paperStyle: {
    height: '89vh',
    overflow: 'scroll',
    position: 'relative'
  },
  panelStyle: {
    height: '89vh',
    position: 'relative'
  },
  menu: {
    background: 'white',
    position: 'absolute',
    width: '100%',
    height: 50,
    zIndex: 4
  },
  panel: {
    paddingTop: 50,
    height: '100%',
    overflow: 'scroll'
  },
  content: {
    padding: 16
  },
  container: {
    padding: 10
  },
  skinny: {
    margin: 0,
    marginBottom: 15
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
    switch (this.state.current) {
      case 'Panel':
        return (
          <div>
            <StudentViewComments comments={this.props.studentTest.comments} />
          </div>
        );
    }
  }

  // <AssessmentCard
  //   assessment= {this.props.studentTest.assessment}
  //   editable={false}
  //   showTeam={false}
  //   showUrl={false}
  //   />
  render () {
    console.log(this.props)
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
    this.props.dispatch(getOwnStudentTest(studentTestId))
  }

  render(){
    return (
      <div style={styles.main}>
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

const mapStateToProps = (state, { params }) => {
  const { studentTest } = state.studentTestInfo
  console.log('current assessment', studentTest.assessment)
  return {
    params,
    studentTest
  }
}

export default withRouter(connect(mapStateToProps)(Grade))
