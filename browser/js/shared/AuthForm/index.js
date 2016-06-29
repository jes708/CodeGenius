'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, reset, change } from 'redux-form'
import Formsy from 'formsy-react'
import { red100 } from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { FormsyText } from 'formsy-material-ui/lib'
import { login, signup } from '../../actions/authActions'
import Form from './Form'

const styles = {
  form: {
    marginTop: 50
  },
  paperStyle: {
    width: 300,
    margin: 'auto',
    padding: 20
  },
  errorMsg: {
    backgroundColor: red100,
    padding: 10,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 10
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

class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: true,
      error: null,
      email: ''
    }
  }

  _submitForm (data) {
    if (data.name) {
        this.props.dispatch(signup({
          name: data.name,
          email: data.email,
          password: data.password
        }))
    } else {
      this.props.dispatch(login({
        email: data.email,
        password: data.password
      }))
    }
  }

  _resetForm() {
    this.props.dispatch(reset());
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error
      })
    }
    this.props.dispatch(change('form', 'password', ''))
  }

renderErrorMsg () {
    return (
      <Paper style={Object.assign({}, styles.paperStyle, styles.errorMsg)}>
        <div>{this.state.error.data}</div>
      </Paper>
    )
  }

  renderLoginForm () {
    return (
      <Paper style={styles.paperStyle}>
        <GitHubButton href='/auth/github' label='Sign In with GitHub' />
        <Formsy.Form
          ref='form'
          onValidSubmit={this._submitForm.bind(this)}>
          <FormsyText
            name="email"
            type="email"
            required
            floatingLabelText="Email"
            validations='isEmail'
          />
          <FormsyText
            name="password"
            type="password"
            required
            floatingLabelText="Password"
          />
          <div style={Object.assign({}, styles.button, styles.fullWidth)}>
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
    )
  }

  renderSignupForm () {
    return (
      <Paper style={styles.paperStyle}>
        <GitHubButton href='/auth/github' />
        <Formsy.Form
          ref='form'
          onValidSubmit={this._submitForm.bind(this)}>
          <FormsyText
            name="name"
            type="name"
            required
            floatingLabelText="Name"
            validations='isWords'
          />
          <FormsyText
            name="email"
            type="email"
            required
            floatingLabelText="Email"
            validations='isEmail'
          />
          <FormsyText
            name="password"
            type="password"
            required
            floatingLabelText="Password"
            validates='minlength:6'
          />
          <div style={Object.assign({}, styles.button, styles.fullWidth)}>
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
    )
  }

  render () {
    return (
      <div style={styles.form}>
        { this.state.error ? this.renderErrorMsg() : null }
        { this.props.location.pathname === 'login'
          ? <Form email={this.state.email} resetForm={this._resetForm} onSubmit={this._submitForm.bind(this)} signUp={false} />
        : <Form name={this.state.name} resetForm={this._resetForm} onSubmit={this._submitForm.bind(this)} signUp={true} />
        }
      </div>
    )
  }
}

AuthForm.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { session } = state
  return {
    error: session.error,
    user: session.user
  }
}

export default connect(mapStateToProps)(AuthForm)
