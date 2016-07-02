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
  container: {
    padding: 10
  },
  skinny: {
    margin: 0,
    marginBottom: 15
  }
}

const SAMPLE_COMMENTS = [
  {
    title: "First really great thing",
    markdown: String.raw`#static files
    (from the static folder in the public folder) on /files route,
    handles internal server errors,
    handles custom errors`,
    tags: [
      {name: 'foo', color: '#3F51B5'},
      {name: 'bar', color: '#3F32A9'},
      {name: 'bar', color: '#4A1EB5'},
      {name: 'bar', color: '#3F51B5'}
    ]
  },
  {
    title: "Second really great thing",
    markdown: `static files (from the static folder in the public folder) on /files route,
    handles internal server errors,
    handles custom errors`,
    tags: [
      {name: 'bar', color: '#3F51B5'}
    ]
  }
]

export default class Grade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      content: '',
      current: 'Home'
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
      <div style={styles.main}>
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

  switcher() {
    switch (this.state.current) {
      case 'Home':
      return <GraderHome />;
      case 'Assessments':
      return <GraderAssessments />;
      case 'Students':
      return <GraderStudents />;
      case 'Panel':
      return (
        <div>
          <GraderPanel comments={ SAMPLE_COMMENTS } />
        </div>
      );
      default:
      return <GraderHome />;
    }
  }

  render () {
      return (
          <div className={this.props.className}>
            <Paper style={styles.panelStyle}>
              <Tabs zDepth={3} style={styles.menu} value={this.state.current}>
                <Tab
                  value={'Home'}
                  icon={<ActionHome />}
                  onClick={this.handleClick.bind(this, "Home")}
                />
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
