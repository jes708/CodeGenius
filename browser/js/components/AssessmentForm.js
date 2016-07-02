'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
export const fields = ['name', 'description', 'repoUrl']

const styles = {
  form: {
    marginTop: 50
  },
  skinny: {
    margin: 0,
    marginBottom: 15
  },
  paperStyle: {
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

class AssessmentForm extends Component {
  render () {
    const {
      fields: {
        name,
        description,
        repoUrl
      },
      handleSubmit,
      onSubmit,
      closeForm
    } = this.props

    return (
      <Paper style={styles.paperStyle}>
        <form>
          <h2 style={styles.skinny}>Create Assessment</h2>
          <TextField
            floatingLabelText="Name"
            {...name}
            style={styles.fullWidth}
          />
          <TextField
            multiLine={true}
            rows={2}
            rowsMax={Infinity}
            floatingLabelText="Description"
            {...description}
            style={styles.fullWidth}
          />
          <TextField
            floatingLabelText="Repo URL"
            {...repoUrl}
            style={styles.fullWidth}
          />
          <div style={Object.assign({}, styles.button, styles.fullWidth)}>
            <RaisedButton
              type="submit"
              label="Create"
              secondary={true}
              onClick={handleSubmit}
              style={styles.fullWidth}
            />
          </div>
        </form>
      </Paper>
    )
  }
}

AssessmentForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'assessmentForm',
  fields
})(AssessmentForm)
