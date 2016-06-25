'use strict'

import React, { Component, PropTypes } from 'react'
import Formsy from 'formsy-react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { grey900, amber700 } from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { FormsyText } from 'formsy-material-ui/lib'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900,
    accent1Color: amber700
  }
})

const styles = {
  form: {
    marginTop: 50
  },
  paperStyle: {
    width: 300,
    margin: 'auto',
    padding: 20
  },
  button: {
    marginTop: 15
  },
  fullWidth: {
    width: '100%'
  },
  center: {
    textAlign: 'center'
  }
}

export default class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: true,
      formType: this.props.location.pathname
    }
  }

  enableButton () {
    this.setState({
      canSubmit: true
    })
  }

  disableButton () {
    this.setState({
      canSubmit: false
    })
  }

  submitForm (data) {
    alert(JSON.stringify(data, null, 4))
  }

  renderGitHubButton () {
    return (
      <div style={styles.fullWidth}>
        <RaisedButton
          label="Sign Up with Github"
          linkButton={true}
          href='/auth/github'
          primary={true}
          style={styles.fullWidth}
          icon={<FontIcon className="fa fa-github" />}
        />
      </div>
    )
  }

  renderLoginForm () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Paper style={styles.paperStyle}>
          {this.renderGitHubButton()}
          <Formsy.Form
            onValid={this.enableButton.bind(this)}
            onInValid={this.disableButton.bind(this)}
            onValidSubmit={this.submitForm.bind(this)}>
            <FormsyText
              name="email"
              type="email"
              required
              floatingLabelText="Email"
            />
            <FormsyText
              name="password"
              type="password"
              required
              floatingLabelText="Password"
            />
            <div style={Object.assign(styles.button, styles.fullWidth)}>
              <RaisedButton
                type="submit"
                label='Login'
                secondary={true}
                style={styles.fullWidth}
                disabled={!this.state.canSubmit}
              />
            </div>
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    )
  }

  renderSignupForm () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Paper style={styles.paperStyle}>
          {this.renderGitHubButton()}
          <Formsy.Form
            onValid={this.enableButton.bind(this)}
            onInValid={this.disableButton.bind(this)}
            onValidSubmit={this.submitForm.bind(this)}>
            <FormsyText
              name="name"
              type="name"
              required
              floatingLabelText="Name"
            />
            <FormsyText
              name="email"
              type="email"
              required
              floatingLabelText="Email"
            />
            <FormsyText
              name="password"
              type="password"
              required
              floatingLabelText="Password"
            />
            <div style={Object.assign(styles.button, styles.fullWidth)}>
              <RaisedButton
                type="submit"
                label='Sign Up'
                secondary={true}
                style={styles.fullWidth}
                disabled={!this.state.canSubmit}
              />
            </div>
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    )
  }

  render () {
    let form
    if (this.state.formType === 'login') {
      form = this.renderLoginForm()
    } else if (this.state.formType === 'signup') {
      form = this.renderSignupForm()
    }

    return (
      <div style={styles.form}>
        {form}
      </div>
    )
  }
}

// <form id="login-form" name="loginForm" ng-submit="loginForm.$valid && sendLogin(login)">

//     <alert type="danger" ng-show="error">
//         {{ error }}
//     </alert>

//     <div class="form-group">
//         <label for="email">Email address</label>
//         <input type="text" ng-model="login.email" class="form-control" id="email" placeholder="Enter email">
//     </div>
//     <div class="form-group">
//         <label for="login-password">Password</label>
//         <input type="password" ng-model="login.password" class="form-control" id="login-password" placeholder="Password">
//     </div>
//     <button type="submit" class="btn btn-default">Submit</button>
// </form>
