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
      canSubmit: true,
      error: null,
      submitting: false
    }
  }

  _submitForm (data) {
    this.setState({
      submitting: true
    });
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
    this.setState({
      submitting: false
    })
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

  render () {
    return (
      <div style={styles.form}>
        { this.props.error ? this.renderErrorMsg() : null }
        { this.props.location.pathname === 'login'
          ? <Form submitting={this.state.submitting} resetForm={this._resetForm} onSubmit={this._submitForm.bind(this)} signUp={false} />
        : <Form submitting={this.state.submitting} resetForm={this._resetForm} onSubmit={this._submitForm.bind(this)} signUp={true} />
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
