'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Paper from 'material-ui/Paper'
export const fields = ['name', 'description', 'repoUrl']

class AssessmentForm extends Component {
  render () {
    return (
      <Paper>
        <form>
        </form>
      </Paper>
    )
  }
}

export default reduxForm({
  form: 'form',
  fields
})(AssessmentForm)
