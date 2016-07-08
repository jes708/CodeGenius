'use strict';

import React, { Component, PropTypes } from 'react';
import axios from "axios"
import { PrismCode } from 'react-prism';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import GraderPanel from '../../components/GraderPanel';
import { Toolbar } from 'material-ui/Toolbar';
import { Tab, Tabs } from 'material-ui/Tabs';
import GraderAssessments from '../../components/GraderAssessments';
import GraderStudents from '../../components/GraderStudents';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import AnnotationHandler from '../../components/Annotator';
import GraderView from '../../components/GraderView'
import { connect } from 'react-redux';

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
  },
  disabledTab: {
    background: '#aaa',
    pointerEvents: 'none'
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

  render(){
    return (
      <div className='col-lg-8'>
        <GraderView />
      </div>
    )
  }
}

class AnnotatedGrade extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div style={styles.main}>
        <AnnotationHandler {...this.props} className='col-lg-8 col-md-6 col-sm-6' >
          <Grade />
        </AnnotationHandler>
        <GradeView assessment={this.props.assessment} student={this.props.student} tab={this.props.location.tab} className='col-lg-4 col-md-6 col-sm-6' />
      </div>
    )
  }
}


export class GradeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      current: this.props.tab
    }
  }

  handleClick(tab) {
    this.setState({
      isLoading: this.state.isLoading,
      content: this.state.content,
      current: tab
    })
  }

  switcher() {
    switch (this.state.current) {
      case 'Students':
        return <GraderStudents switchTabs={this.handleClick.bind(this)} />;
      case 'Panel':
        return <GraderPanel />
      case 'Assessments':
      default:
        return <GraderAssessments switchTabs={this.handleClick.bind(this)} />
    }
  }

  render () {
    let step1 = {};
    let step2 = {};

    if (!this.props.assessment || !this.props.assessment.id) {
      step1 = styles.disabledTab;
    }

    if (!this.props.student || !this.props.student.id) {
      step2 = styles.disabledTab;
    }

      return (
          <div className={this.props.className}>
            <Paper style={styles.panelStyle}>
              <Tabs zDepth={3} style={styles.menu} value={this.state.current}>
                <Tab
                  value={'Assessments'}
                  title={'Assessments'}
                  icon={<EditorInsertDriveFile />}
                  onClick={this.handleClick.bind(this, "Assessments")}
                />
                <Tab
                  style={step1}
                  value={'Students'}
                  title={'Students'}
                  icon={<SocialGroup />}
                  onClick={this.handleClick.bind(this, "Students")}
                />
                <Tab
                  style={step2}
                  value={'Panel'}
                  title={'Grader Panel'}
                  icon={<ActionAssignmentTurnedIn />}
                  onClick={this.handleClick.bind(this, "Panel")}
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

const mapStateToProps = state => {
  const { assessments } = state;
  return {
    assessment: assessments.current.base,
    student: assessments.current.student
  }
}


export default connect(mapStateToProps)(AnnotatedGrade)
