'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { blue600 } from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'
export const fields = ['name', 'description', 'repoUrl']

const styles = {
  blueBg: {
    backgroundColor: blue600
  },
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
  },
  stepLabel: {
    fontSize: '24'
  }
}

const validate = (values) => {
  if (!values) return {}
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.repoUrl) {
    errors.repoUrl = 'Required'
  } else if (/^(https?:\/\/)?(www.)?(github.com\/)/i.test(values.repoUrl)) {
    errors.repoUrl = 'Please enter valid GitHub URL'
  }
}

class AssessmentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0,
    }
  }

  handleNext () {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1,
    })
  }

  handlePrev () {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  renderStepActions(step) {
    const { stepIndex } = this.state

          // disableTouchRipple={true}
          // disableFocusRipple={true}
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 1 ? 'Create' : 'Next'}
          primary={stepIndex !== 1}
          secondary={stepIndex === 1}
          onTouchTap={this.handleNext.bind(this)}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev.bind(this)}
          />
        )}
      </div>
    );
  }

  renderInfoForm () {
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

          // <h2 style={styles.skinny}>Create Assessment</h2>
    return (
      <Paper zDepth={0} style={styles.paperStyle}>
        <form>
          <TextField
            floatingLabelText="Name"
            {...name}
            style={styles.fullWidth}
            errorText={name.touched && name.error}
          />
          <TextField
            multiLine={true}
            rows={2}
            rowsMax={Infinity}
            floatingLabelText="Description"
            {...description}
            style={styles.fullWidth}
            errorText={description.touched && description.error}
          />
          <TextField
            floatingLabelText="Repo URL"
            {...repoUrl}
            style={styles.fullWidth}
            errorText={repoUrl.touched && repoUrl.error}
          />
        </form>
      </Paper>
    )
          // <div style={Object.assign({}, styles.button, styles.fullWidth)}>
          //   <RaisedButton
          //     type="submit"
          //     label="Create"
          //     secondary={true}
          //     style={styles.fullWidth}
          //   />
          // </div>
  }

  render () {
    const { finished, stepIndex } = this.state

    return (
      <Paper style={styles.paperStyle}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel style={styles.stepLabel}>Enter Assessment Information</StepLabel>
            <StepContent>
              {this.renderInfoForm()}
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel style={styles.stepLabel}>Select the Solution Files</StepLabel>
            <StepContent>
              <ul>
                <li>test.js</li>
                <li>app.js</li>
                <li>package.json</li>
              </ul>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
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
  fields,
  validate
})(AssessmentForm)
