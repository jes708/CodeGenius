'use strict';

import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import GitHubButton from '../GitHubButton';
import Paper from 'material-ui/Paper'
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
  if(!values.passwordConfirm && values.password) {
    errors.passwordConfirm = 'Please confirm your password'
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Passwords do not match'
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
            <div>
              <label>Name</label>
              <input type="text" required="required" placeholder="Name" {...name}/>
            </div>
          : null
          }
          {name.touched && name.error && <div>{name.error}</div>}
          <div>
            <label>Email</label>
            <input type="text" required="required" placeholder="Email" {...email}/>
          </div>
          {email.touched && email.error && <div>{email.error}</div>}
          <div>
            <label>Password</label>
            <input type="password" required="required" placeholder="Password" {...password}/>
          </div>
          {password.touched && password.error && <div>{password.error}</div>}
          {signUp ?
          <div>
            <label>Confirm Password</label>
            <input type="password" required="required" placeholder="Confirm Password" {...passwordConfirm}/>
          </div>
            : null
          }
          {passwordConfirm.touched && passwordConfirm.error && <div>{passwordConfirm.error}</div>}
          <div style={Object.assign({}, styles.button, styles.fullWidth)}>
            <button onClick={handleSubmit} style={styles.fullWidth} type="submit">{signUp ? 'Signup' : 'Login'}</button>
          </div>
          {signUp ?
            <div style={Object.assign({}, styles.button, styles.fullWidth)}>
              <button onClick={resetForm} style={styles.fullWidth} type="submit">Reset</button>
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
  form: 'form2',
  fields,
  validate
})(Form)
