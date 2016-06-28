import React, { Component, PropTypes } from 'react';
import { PrismCode } from 'react-prism';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import GraderPanel from '../GraderPanel';
import GradeView from '../GradeView';
import { Toolbar } from 'material-ui/Toolbar';
import { Tab, Tabs } from 'material-ui/Tabs';
import Assessments from '../Assessments'
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file'
import ActionHome from 'material-ui/svg-icons/action/home'
import SocialGroup from 'material-ui/svg-icons/social/group'
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in'


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

export default class GradeMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      content: '',
      current: 'GraderPanel'
    }
  }

  getData () {
    fetch('https://raw.githubusercontent.com/jes708/assessment-express-sequelize/master/models/article.js?token=AFJQ-XVgFA056_WGPpBVtQs2M3cBe_Tyks5XeLBfwA%3D%3D')
    .then(res => res.text())
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

  handleClick(tab) {
    this.setState({
      isLoading: this.state.isLoading,
      content: this.state.content,
      current: tab
    })
    this.handleClick = this.handleClick.bind(this);
  }

  render () {
    let switcher = () => {
      switch (this.state.current) {
        case 'Home':
          return <Assessments />;
        case 'Assessments':
          return <Assessments />;
        case 'Students':
          return <Assessments />;
        case 'GraderPanel':
          return <GraderPanel />;
      }
    }
    if (this.state.isLoading) {
      return <h1>Loading!</h1>
    } else {
      return (
        <div style={styles.row}>
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
          <div className='col-lg-4'>
            <Paper style={styles.panelStyle}>
              <Tabs zDepth={3} style={styles.menu}>
                <Tab
                  icon={<ActionHome />}
                  onClick={this.handleClick.bind(this, "Home")}
                />
                <Tab
                  icon={<EditorInsertDriveFile />}
                  onClick={this.handleClick.bind(this, "Assessments")}
                />
                <Tab
                  icon={<SocialGroup />}
                  onClick={this.handleClick.bind(this, "Students")}
                />
                <Tab
                  icon={<ActionAssignmentTurnedIn />}
                  onClick={this.handleClick.bind(this, "GraderPanel")}
                />
              </Tabs>
              <div style={styles.panel}>
                {switcher()}
              </div>
            </Paper>
          </div>
        </div>
      )
    }
  }
}