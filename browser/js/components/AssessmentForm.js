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
import { getUserOrgs, getOrgTeams, getOrgRepo, getSolutionFileDiff } from '../actions/githubActions'
import { mapState } from '../reducers/github'
import styles from './graderStyles'
import CircularProgress from 'material-ui/CircularProgress'

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
        solutionRepoUrl: assessment ? assessment.solutionRepoUrl : '',
        org: assessment ? assessment.org : '',
        teamName: assessment ? assessment.team.name : '',
        teamId: assessment ? assessment.teamId : '',
      },
      errors: {},
      path: '',
      paths: assessment ? assessment.solutionFiles : [],
      isRepoChecking: false
    }

    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemovePath = this.handleRemovePath.bind(this)
    this.handleRepoCheck = this.handleRepoCheck.bind(this)
    this.handlePathChange = this.handlePathChange.bind(this)
    this.handleOrgSelect = this.handleOrgSelect.bind(this)
    this.handleTeamSelect = this.handleTeamSelect.bind(this)
    this.handleRepoUrl = this.handleRepoUrl.bind(this)
    this.handleSolutionUrl = this.handleSolutionUrl.bind(this)
    this.checkAndAddPath = this.checkAndAddPath.bind(this)

  }

  componentDidMount () {
    this.props.dispatch(getUserOrgs())
  }

  componentWillReceiveProps (nextProps) {
    const { paths } = this.state
    const { files } = nextProps
    if (files && paths.length === 0) this.setState({ paths: files.map(file => file.filename) })
  }

  handleSubmit () {
    const { form, paths, repo, solutionRepo } = this.state
    form.solutionFiles = paths
    form.basePath = repo
    form.solutionPath = solutionRepo
    this.props.onSubmit(form)
  }

  handleRemovePath (i) {
    const { paths } = this.state
    const newPaths = paths.slice(0, i).concat(paths.slice(i + 1))
    this.setState({ paths: newPaths })
  }

  checkAndAddPath () {
    const { path, paths, solutionRepo, errors } = this.state
    const newErrors = Object.assign({}, errors)

    if (paths.includes(path) || paths.includes(path.substr(1)) || paths.includes(`/${path}`)) {
      newErrors.path = { statusText: 'Path already exists' }
      this.setState({
        path: '',
        errors: newErrors
      })
    } else {
      axios.get(`/api/v1/github/${solutionRepo}/contents?path=${path}`)
      .then(() => {
        newErrors.path = {}
        this.setState({
          paths: paths.concat(path),
          path: '',
          errors: newErrors
        })
      })
      .catch(() => {
        newErrors.path = { statusText: 'Enter a valid file path' }
        this.setState({ errors: newErrors })
      })
    }
  }

  handleRepoCheck () {
    const { stepIndex, form, errors } = this.state
    const { dispatch } = this.props
    const regexp = /^(\s*?https?:\/\/)?(www.)?(github.com\/)/i
    const repo = form.repoUrl.split(regexp)[4].trim()
    const solutionRepo = form.solutionRepoUrl.split(regexp)[4].trim()
    const newErrors = Object.assign({}, errors)

    this.setState({
      isRepoChecking: true
    })

    axios.get(`/api/v1/github/${repo}`)
    .then(() => {
      newErrors.repo = {}
      this.setState({
        stepIndex: stepIndex + 1,
        errors: newErrors,
        repo
      })
    }, (error) => {
      newErrors.repo = { statusText: error.statusText }
      this.setState({ errors: newErrors })
    })
    .then(() => {
      axios.get(`/api/v1/github/${solutionRepo}`)
      .then(() => {
        newErrors.solutionRepo = {}
        dispatch(getSolutionFileDiff(repo, solutionRepo))
        this.setState({
          stepIndex: stepIndex + 1,
          errors: newErrors,
          solutionRepo
        })
      }, (error) => {
        newErrors.solutionRepo = { statusText: error.statusText }
        this.setState({ errors: newErrors })
      })
    })
    .catch(error => console.error(error))

    this.setState({
      isRepoChecking: false
    })
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
    this.props.dispatch(getOrgRepo(nextForm.org))
  }

  handleRepoUrl = (repoUrl) => {
    const nextForm = Object.assign({}, this.state.form)
    const regexp = /^(\s*?https?:\/\/)?(www.)?(github.com\/)/i
    nextForm.repoUrl = regexp.test(repoUrl) ? repoUrl : `https://github.com/${repoUrl}`
    this.setState({ form: nextForm })
  }

  handleSolutionUrl = (solutionRepoUrl) => {
    const nextForm = Object.assign({}, this.state.form)
    const regexp = /^(\s*?https?:\/\/)?(www.)?(github.com\/)/i
    nextForm.solutionRepoUrl = regexp.test(solutionRepoUrl) ? solutionRepoUrl : `https://github.com/${solutionRepoUrl}`
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
    const { stepIndex, isRepoChecking } = this.state
    const { assessment, isCreatingAssessment } = this.props
    let buttonLabel
    let onTap = this.handleSubmit

    if (stepIndex === 1 && assessment) {
      buttonLabel = 'Save'
    } else if (stepIndex === 1) {
      buttonLabel = 'Create'
    } else {
      buttonLabel = 'Next'
      onTap = this.handleRepoCheck
    }

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={buttonLabel}
          primary={stepIndex !== 1}
          secondary={stepIndex === 1}
          onTouchTap={onTap}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
          />
        )}
        { isRepoChecking || isCreatingAssessment
          ? <CircularProgress style={{position: 'absolute', bottom: 5}} size={0.5} />
          : null
        }
      </div>
    );
  }

  renderInfoForm () {
    const { orgs, isFetchingTeams, teams, orgrepo } = this.props
    const { form, errors } = this.state

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
            : <div>
                <AutoComplete
                floatingLabelText="Repo Url"
                filter={AutoComplete.fuzzyFilter}
                dataSource={orgrepo.map(repo => `${repo}`)}
                maxSearchResults={5}
                searchText={form.repoUrl}
                onNewRequest={this.handleRepoUrl}
                fullWidth={true}
                errorText={errors && errors.statusText}
                />
                <AutoComplete
                floatingLabelText="Solution Url"
                filter={AutoComplete.fuzzyFilter}
                dataSource={orgrepo.map(repo => `${repo}`)}
                maxSearchResults={5}
                searchText={form.solutionRepoUrl}
                onNewRequest={this.handleSolutionUrl}
                onBlur={this.handleSolutionUrl}
                fullWidth={true}
                errorText={errors && errors.statusText}
                />
              </div>
          }
        </form>
      </Paper>
    )
  }

  renderSolutionSelector () {
    const { path, errors } = this.state

    return (
      <Paper zDepth={0} style={styles.formPaperStyle}>
        <TextField
          floatingLabelText="Solution Path"
          value={path}
          onChange={this.handlePathChange}
          errorText={errors.path && errors.path.statusText}
        />
        <IconButton
          primary={true}
          iconClassName='fa fa-plus'
          type='submit'
          style={styles.addBtn}
          iconStyle={{color: '#fff'}}
          onTouchTap={this.checkAndAddPath}
        />
      </Paper>
    )
  }

  renderSolutionPaths () {
    const { paths } = this.state
    const { isFetchingFiles } = this.props
    if (isFetchingFiles) return (<div style={styles.center}><CircularProgress size={2} /></div>)
    else {
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
  }

  render () {
    const { stepIndex } = this.state
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
        </Paper>
      )
    }
  }
}

AssessmentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { github, assessments } = state
  const { isFetchingOrgs, byId } = github.orgs
  const { isFetchingTeams, byTeamId } = github.teams
  const { isFetchingOrgRepo, byRepoId } = github.orgRepos
  const { isFetchingFiles, byName } = github.files

  return {
    isFetchingOrgs,
    isFetchingTeams,
    isFetchingOrgRepo,
    isFetchingFiles,
    orgs: mapState(byId),
    teams: mapState(byTeamId),
    files: mapState(byName),
    orgrepo: mapState(byRepoId),
    isCreatingAssessment: assessments.isFetching,
  }
}

export default connect(mapStateToProps)(AssessmentForm)
