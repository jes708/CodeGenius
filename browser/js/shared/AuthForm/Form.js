'use strict';

import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import GitHubButton from '../GitHubButton';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { red100 } from 'material-ui/styles/colors';
export const fields = ['name', 'email', 'password', 'passwordConfirm']


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
let signingUp = false;

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if(signingUp) {
    if(!values.name) {
      errors.name = 'Required'
    } else if(values.name.length < 5) {
      errors.name = 'Name is too short'
    }
  }
  if(!values.password) {
    errors.password = 'Required'
  } else if(values.password.length < 6) {
    errors.password = 'Password is too short'
  }
  if(signingUp) {
    if(!values.passwordConfirm && values.password) {
      errors.passwordConfirm = 'Please confirm your password'
    } else if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = 'Passwords do not match'
    }
  }
  return errors
}

class Form extends Component {
  render() {
    const {fields: {name, email, password, passwordConfirm}, handleSubmit, resetForm, onSubmit, signUp} = this.props;
    signingUp = signUp ? true : false;
    return (
      <Paper style={styles.paperStyle}>
        {signUp ? <GitHubButton href='/auth/github' /> : <GitHubButton href='/auth/github' label='Sign In with Github'/>}

        <form onSubmit={handleSubmit}>
          {signUp ?
            <TextField
              floatingLabelText="Name"
              {...name}
              errorText={name.touched && name.error}
            />
          : null
          }
          <TextField
            floatingLabelText="Email"
            {...email}
            errorText={email.touched && email.error}
          />
          <TextField
            floatingLabelText="Password"
            type="password"
            {...password}
            errorText={password.touched && password.error}
          />
          {signUp ?
          <TextField
            type="password"
            floatingLabelText="Confirm Password"
            {...passwordConfirm}
            errorText={passwordConfirm.touched && passwordConfirm.error}
          />
            : null
          }
          <div style={Object.assign({}, styles.button, styles.fullWidth)}>
            <RaisedButton
              secondary={true}
              onClick={handleSubmit}
              style={styles.fullWidth}
              label={signUp ? 'Signup' : 'Login'}
              type="submit"
            />
          </div>
          {signUp ?
            <div style={Object.assign({}, styles.button, styles.fullWidth)}>
              <RaisedButton
                primary={true}
                onClick={resetForm}
                style={styles.fullWidth}
                type="submit"
                label="Reset"
              />
            </div>
            : null
          }
        </form>
    </Paper>
    )
  }
}

Form.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'form',
  fields,
  validate
})(Form)
