'use strict'

import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { blue600 } from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import AutoComplete from 'material-ui/AutoComplete'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import { getUserOrgs, getOrgTeams } from '../actions/githubActions'
import { getOrgs, getTeams } from '../reducers/github'
import styles from './graderStyles'

// const validate = (values) => {
//   const errors = {}
//   if (!values.name) {
//     errors.name = 'Required'
//   }
//   if (!values.description) {
//     errors.description = 'Required'
//   }
//   if (!values.repoUrl) {
//     errors.repoUrl = 'Required'
//   } else if (/^(https?:\/\/)?(www.)?(github.com\/)/i.test(values.repoUrl)) {
//     errors.repoUrl = 'Please enter valid GitHub URL'
//   }
//   return errors
// }

class AssessmentForm extends Component {
  constructor(props) {
    super(props)

    const { assessment } = props

    this.state = {
      finished: false,
      stepIndex: 0,
      form: {
        id: assessment ? assessment.id : '',
        name: assessment ? assessment.name : '',
        description: assessment ? assessment.description : '',
        repoUrl: assessment ? assessment.repoUrl : '',
        org: assessment ? assessment.org : '',
        teamName: assessment ? assessment.team.name : '',
        teamId: assessment ? assessment.teamId : '',
      },
      errors: {},
      path: '',
      paths: assessment ? assessment.solutionFiles : [],
    }
  }

  componentDidMount () {
    this.props.dispatch(getUserOrgs())
  }

  handleSubmit () {
    const { form, paths, repo } = this.state
    form.solutionFiles = paths
    form.basePath = repo
    this.props.onSubmit(form)
  }

  handleRemovePath (i) {
    const { paths } = this.state
    const newPaths = paths.slice(0, i).concat(paths.slice(i + 1))
    this.setState({ paths: newPaths })
  }

  checkAndAddPath () {
    const { path, paths, repo } = this.state

    if (paths.includes(path) || paths.includes(path.substr(1)) || paths.includes(`/${path}`)) {
      this.setState({
        path: '',
        error: { statusText: 'Path already exists' }
      })
    } else {
      axios.get(`/api/v1/github/${repo}/contents?path=${path}`)
      .then(() => {
          this.setState({
            paths: paths.concat(path),
            path: '',
            error: null
          })
      })
      .catch(error => {
        error.statusText = 'Enter a valid file path'
        this.setState({ error })
      })
    }
  }

  handleRepoCheck () {
    const { stepIndex, form } = this.state
    const repo = form.repoUrl.split(/^(\s*?https?:\/\/)?(www.)?(github.com\/)/i)[4].trim()
    axios.get(`/api/v1/github/${repo}`)
    .then(() => {
      this.setState({
        stepIndex: stepIndex + 1,
        error: null,
        repo
      })
    })
    .catch(error => this.setState({ error }))
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
      this.setState({
        stepIndex: stepIndex - 1,
        path: '',
        error: null
      })
    }
  }

  handleChange = (e, field) => {
    const nextForm = Object.assign({}, this.state.form)
    nextForm[field] = e.target.value
    this.setState({ form: nextForm })
  }

  handlePathChange = (e) => {
    this.setState({ path: e.target.value })
  }

  handleOrgSelect = (orgName) => {
    const nextForm = Object.assign({}, this.state.form)
    nextForm.org = orgName
    this.setState({ form: nextForm })
    this.props.dispatch(getOrgTeams(orgName))
  }

  handleTeamSelect = (team) => {
    const nextForm = Object.assign({}, this.state.form)
    nextForm.teamId = team.id
    nextForm.teamName = team.name
    this.setState({ form: nextForm })
  }

  renderOrgInput () {
    const { form } = this.state
    const { orgs, assessment } = this.props

    if (!assessment) {
      return (
        <AutoComplete
          floatingLabelText='Organization'
          filter={AutoComplete.fuzzyFilter}
          dataSource={orgs.map(org => org.login)}
          maxSearchResults={4}
          searchText={form.org}
          fullWidth={true}
          onNewRequest={this.handleOrgSelect}
        />
      )
    } else {
      return (
        <TextField
          floatingLabelText='Organization'
          value={form.org}
          fullWidth={true}
          disabled={true}
        />
      )
    }
  }

  renderTeamInput () {
    const { form } = this.state
    const { assessment, isFetchingTeams, teams } = this.props

    if (!isFetchingTeams && teams.length && !assessment) {
      return (
        <AutoComplete
          floatingLabelText='Team'
          filter={AutoComplete.fuzzyFilter}
          dataSource={teams}
          dataSourceConfig={{text: 'name', value: 'name'}}
          maxSearchResults={4}
          searchText={form.teamName}
          fullWidth={true}
          onNewRequest={this.handleTeamSelect}
        />
      )
    } else if (assessment) {
      return (
        <TextField
          floatingLabelText='Team'
          value={form.teamName}
          fullWidth={true}
          disabled={true}
        />
      )
    }
  }

  renderStepActions(step) {
    const { stepIndex } = this.state
    const { assessment } = this.props
    let buttonLabel

    if (stepIndex === 1 && assessment) {
      buttonLabel = 'Save'
    } else if (stepIndex === 1) {
      buttonLabel = 'Create'
    } else {
      buttonLabel = 'Next'
    }

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={buttonLabel}
          primary={stepIndex !== 1}
          secondary={stepIndex === 1}
          onTouchTap={stepIndex === 1
            ? this.handleSubmit.bind(this)
            : this.handleRepoCheck.bind(this) }
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
    const { orgs, isFetchingTeams, teams } = this.props
    const { form, error } = this.state

    return (
      <Paper zDepth={0} style={styles.formPaperStyle}>
        <form>
          <TextField
            floatingLabelText="Name"
            value={form.name}
            fullWidth={true}
            onChange={(e) => this.handleChange(e, 'name')}
          />
          <TextField
            floatingLabelText="Description"
            multiLine={true}
            rows={1}
            rowsMax={Infinity}
            value={form.description}
            fullWidth={true}
            onChange={(e) => this.handleChange(e, 'description')}
          />
          {this.renderOrgInput()}
          {this.renderTeamInput()}
          { form.teamId === ''
            ? null
            : <TextField
                floatingLabelText="Repo URL"
                value={form.repoUrl}
                fullWidth={true}
                onChange={(e) => this.handleChange(e, 'repoUrl')}
                errorText={error && error.statusText}
              />
          }
        </form>
      </Paper>
    )
  }

  renderSolutionSelector () {
    const { path, error } = this.state

    return (
      <Paper zDepth={0} style={styles.formPaperStyle}>
        <TextField
          floatingLabelText="Solution Path"
          value={path}
          onChange={this.handlePathChange.bind(this)}
          errorText={error && error.statusText}
        />
        <IconButton
          primary={true}
          iconClassName='fa fa-plus'
          type='submit'
          style={styles.addBtn}
          iconStyle={{color: '#fff'}}
          onTouchTap={this.checkAndAddPath.bind(this)}
        />
      </Paper>
    )
  }

  renderSolutionPaths () {
    const { paths } = this.state
    const pathComponents = paths.map((path, i) => {
      return (
        <ListItem
          key={i}
          primaryText={path}
          leftIcon={<FontIcon className="fa fa-file" />}
          rightIconButton={<IconButton
            iconClassName='fa fa-times'
            onClick={() => this.handleRemovePath(i)}/>}
        />
      )
    })
    return <List>{pathComponents}</List>
  }

  render () {
    const { finished, stepIndex } = this.state
    const { isFetchingOrgs, orgs } = this.props

    if (isFetchingOrgs && !orgs.length) return <h1>Is Loading...</h1>
    else {
      return (
        <Paper style={styles.formPaperStyle}>
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
                {this.renderSolutionSelector()}
                {this.renderSolutionPaths()}
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
                Reset
              </a>
            </p>
          )}
        </Paper>
      )
    }
  }
}

AssessmentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { github } = state
  const { isFetchingOrgs, byId } = github.orgs
  const { isFetchingTeams, byTeamId } = github.teams

  return {
    isFetchingOrgs,
    isFetchingTeams,
    orgs: getOrgs(byId),
    teams: getTeams(byTeamId)
  }
}

export default connect(mapStateToProps)(AssessmentForm)
