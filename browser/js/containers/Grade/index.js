import axios from "axios"
import React, { Component, PropTypes } from 'react';
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
import GraderHome from '../../components/GraderHome';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import AnnotationHandler from '../../components/Annotator';

const styles = {
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
    height: 50
  },
  panel: {
    paddingTop: 50,
    height: '100%',
    overflow: 'scroll'
  },
  content: {
    padding: 16
  },
  row: {
    paddingRight: 30,
    paddingLeft: 30
  },
  container: {
    padding: 10
  },
  skinny: {
    margin: 0,
    marginBottom: 15
  }
}

export default class Grade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      content: '',
      current: 'Assessments'
    }
  }

  getData () {
    axios.get('https://raw.githubusercontent.com/christianalfoni/formsy-react/master/examples/login/app.js')
    .then(res => res.data)
    .then(content => {
      this.setState({
        isLoading: false,
        content: content,
        current: this.state.current
      })
    })
    .catch(() => new Error('Error while fetching data'))
  }

  componentDidMount() {
    this.getData()
  }

  render(){
    return this.state.isLoading ? (<h1>Loading!</h1>) : (
      <div className='col-lg-8'>
        <Paper zDepth={2} style={styles.paperStyle}>
          <div style={styles.content}>
            <h2 style={styles.skinny}>/models/article.js</h2>
            <pre className='line-numbers language-javascript'>
              <PrismCode className='language-javascript'>
                  {this.state.content}
              </PrismCode>
            </pre>
          </div>
        </Paper>
      </div>
    )
  }
}

export class AnnotatedGrade extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div class="row" >
        <AnnotationHandler {...this.props} className='col-lg-8' >
          <Grade />
        </AnnotationHandler>
        <GradeView tab={this.props.location.tab} className='col-lg-4' />
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
    // this.handleClick = this.handleClick.bind(this);
  }

  switcher () {
    switch (this.state.current) {
      case 'Students':
        return <GraderStudents />;
      case 'Panel':
        return <GraderPanel />;
      case 'Assessments':
      default:
        return <GraderAssessments switchTabs={this.handleClick.bind(this)}/>;
    }
  }

  render () {
      return (
          <div className='col-lg-4' style={styles.row}>
            <Paper style={styles.panelStyle}>
              <Tabs zDepth={3} style={styles.menu} value={this.state.current}>
                <Tab
                  value={'Assessments'}
                  icon={<EditorInsertDriveFile />}
                  onClick={this.handleClick.bind(this, "Assessments")}
                />
                <Tab
                  value={'Students'}
                  icon={<SocialGroup />}
                  onClick={this.handleClick.bind(this, "Students")}
                />
                <Tab
                  value={'Panel'}
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
