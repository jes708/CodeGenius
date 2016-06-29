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

const MyInput = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = 'form-group' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
// <<<<<<< HEAD
      canSubmit: false
// =======
      // canSubmit: true,
      // error: null,
      // email: ''
// >>>>>>> master
    }
  }

  enableButton () {
    this.setState({
      canSubmit: true
    })
  }

  disableButton () {
    this.setState({
      canSubmit: false,
    })
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
        <Form
          onSubmit={this._submitForm.bind(this)}
          onValid={this.enableButton.bind(this)}
          onInvalid={this.disableButton.bind(this)}>
          <MyInput name="email" title="Email" validations="isEmail" validationError="This is not a valid email" required />
          <MyInput name="password" title="Password" type="password" required />
          <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
        </Form>
      </Paper>
    )
  }
        // <Formsy.Form
        //   ref='form'
        //   onValid={this.enableButton.bind(this)}
        //   onInvalid={this.disableButton.bind(this)}
        //   onValidSubmit={this._submitForm.bind(this)}>
        //   <FormsyText
        //     name="email"
        //     type="email"
        //     required
        //     floatingLabelText="Email"
        //     validations='isEmail'
        //   />
        //   <FormsyText
        //     name="password"
        //     type="password"
        //     required
        //     floatingLabelText="Password"
        //   />
        //   <div style={Object.assign({}, styles.button, styles.fullWidth)}>
        //     <RaisedButton
        //       type="submit"
        //       label='Login'
        //       secondary={true}
        //       style={styles.fullWidth}
        //       disabled={!this.state.canSubmit}
        //     />
        //   </div>
        // </Formsy.Form>

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
        { this.props.error ? this.renderErrorMsg() : null }
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
