'use strict'

import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import Promise from 'bluebird'
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

    if (assessment) {
      const regexp = /^(\s*?https?:\/\/)?(www.)?(github.com\/)/i
      assessment.repoUrl = assessment.repoUrl.split(regexp)[4]
      assessment.solutionRepoUrl = assessment.solutionRepoUrl.split(regexp)[4]
    }

    this.state = {
      finished: false,
      stepIndex: 0,
      form: {
        id: assessment ? assessment.id : '',
        name: assessment ? assessment.name : '',
        repoUrl: assessment ? assessment.repoUrl : '',
        solutionRepoUrl: assessment ? assessment.solutionRepoUrl : '',
        org: assessment ? assessment.org : '',
        teamName: assessment ? assessment.team.name : '',
        teamId: assessment ? assessment.teamId : '',
      },
      errors: {},
      path: '',
      paths: assessment ? assessment.solutionFiles : [],
      isRepoChecking: false,
      canSubmit: !!assessment
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
    const { repoUrl, solutionRepoUrl } = form
    const regexp = /^(\s*?https?:\/\/)?(www.)?(github.com\/)/i
    form.repoUrl = regexp.test(repoUrl) ? repoUrl : `https://github.com/${repoUrl}`
    form.solutionRepoUrl = regexp.test(solutionRepoUrl) ? solutionRepoUrl : `https://github.com/${solutionRepoUrl}`
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
    const repo = regexp.test(form.repoUrl) ? form.repoUrl.split(regexp)[4].trim() : form.repoUrl
    const solutionRepo = regexp.test(form.solutionRepoUrl) ? form.solutionRepoUrl.split(regexp)[4].trim() : form.solutionRepoUrl
    const newErrors = Object.assign({}, errors)

    this.setState({
      isRepoChecking: true
    })

    Promise.all([
      axios.get(`/api/v1/github/${repo}`)
      .then(() => {
        delete newErrors.repoUrl
        this.setState({
          errors: newErrors,
          repo
        })
      }, (error) => {
        newErrors.repoUrl = { statusText: error.statusText }
        this.setState({ errors: newErrors })
      }),
      axios.get(`/api/v1/github/${solutionRepo}`)
      .then(() => {
        delete newErrors.solutionRepoUrl
        this.setState({
          errors: newErrors,
          solutionRepo
        })
      }, (error) => {
        newErrors.solutionRepoUrl = { statusText: error.statusText }
        this.setState({ errors: newErrors })
      })
    ])
    .then(() => {
      if (!this.state.errors.repoUrl && !this.state.errors.solutionRepoUrl) {
        this.setState({ stepIndex: stepIndex + 1 })
        dispatch(getSolutionFileDiff(repo, solutionRepo))
      }
      this.setState({ isRepoChecking: false })
    })
    .catch(error => {
      if (this.state.errors.repoUrl && !this.state.errors.solutionRepoUrl) {
        newErrors.solutionRepoUrl = { statusText: error.statusText }
      } else {
        newErrors.repoUrl = { statusText: error.statusText }
      }
      this.setState({
        errors: newErrors,
        isRepoChecking: false
      })
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
    const newErrors = Object.assign({}, this.state.errors)
    const nextForm = Object.assign({}, this.state.form)
    const input = e.target.value
    const newCanSubmit =
      (this.state.form.solutionRepoUrl !== ''
       && this.state.form.repoUrl !== ''
       && this.state.form.org !== ''
       && input !== '')
    nextForm[field] = input
    if (input === '') {
      newErrors[field] = { statusText: 'Required' }
    } else {
      delete newErrors[field]
    }
    this.setState({
      form: nextForm,
      errors: newErrors,
      canSubmit: newCanSubmit
    })
  }

  handlePathChange = (e) => {
    this.setState({ path: e.target.value })
  }

  handleOrgSelect = (orgName) => {
    const newErrors = Object.assign({}, this.state.errors)
    const nextForm = Object.assign({}, this.state.form)
    const newCanSubmit =
      (this.state.form.solutionRepoUrl !== ''
       && orgName || orgName !== ''
       && this.state.form.repoUrl !== ''
       && this.state.form.name !== ''
       && this.state.form.teamId !== '')
    nextForm.org = orgName
    if (!orgName || orgName === '') {
      newErrors.org = { statusText: 'Required' }
    } else {
      delete newErrors.org
    }
    this.setState({
      form: nextForm,
      canSubmit: newCanSubmit,
      errors: newErrors
    })
    this.props.dispatch(getOrgTeams(orgName))
  }

  handleTeamSelect = (team) => {
    const newErrors = Object.assign({}, this.state.errors)
    const nextForm = Object.assign({}, this.state.form)
    const newCanSubmit =
      (this.state.form.solutionRepoUrl !== ''
       && this.state.form.org !== ''
       && this.state.form.repoUrl !== ''
       && this.state.form.org !== ''
       && team.id)
    nextForm.teamId = team.id || ''
    nextForm.teamName = team.name || ''
    if (!team || team === '') {
      newErrors.teamId = { statusText: 'Required' }
    } else {
      delete newErrors.teamId
    }
    this.setState({
      form: nextForm,
      canSubmit: newCanSubmit,
      errors: newErrors
    })
    this.props.dispatch(getOrgRepo(nextForm.org))
  }

  handleRepoUrl = (repoUrl) => {
    const newErrors = Object.assign({}, this.state.errors)
    const nextForm = Object.assign({}, this.state.form)
    const newCanSubmit =
      (nextForm.solutionRepoUrl !== ''
       && repoUrl !== ''
       && this.state.form.org !== ''
       && this.state.form.teamId !== ''
       && this.state.form.name !== '')
    nextForm.repoUrl = repoUrl
    if (!repoUrl || repoUrl === '') {
      newErrors.repoUrl = { statusText: 'Required' }
    } else {
      delete newErrors.repoUrl
    }
    this.setState({
      form: nextForm,
      canSubmit: newCanSubmit,
      errors: newErrors
    })
  }

  handleSolutionUrl = (solutionRepoUrl) => {
    const nextForm = Object.assign({}, this.state.form)
    const newErrors = Object.assign({}, this.state.errors)
    const newCanSubmit =
      (solutionRepoUrl !== ''
       && nextForm.repoUrl !== ''
       && this.state.form.teamId !== ''
       && this.state.form.org !== ''
       && this.state.form.name !== '')
    nextForm.solutionRepoUrl = solutionRepoUrl
    if (!solutionRepoUrl || solutionRepoUrl === '') {
      newErrors.solutionRepoUrl = { statusText: 'Required' }
    } else {
      delete newErrors.solutionRepoUrl
    }
    this.setState({
      form: nextForm,
      canSubmit: newCanSubmit,
      errors: newErrors
    })
  }

  renderOrgInput () {
    const { form, errors } = this.state
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
          onUpdateInput={this.handleOrgSelect}
          errorText={errors.org && errors.org.statusText}
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
    const { form, errors } = this.state
    const { assessment, isFetchingTeams, teams } = this.props

    if (form.org !== '' && !isFetchingTeams && teams.length && !assessment) {
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
          onUpdateInput={this.handleTeamSelect}
          errorText={errors.teamId && errors.teamId.statusText}
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

  renderUrlInput () {
    const { form, errors } = this.state
    const { orgrepo } = this.props

    if (form.teamId !== '') {
      return (
        <div>
          <AutoComplete
            floatingLabelText="Repo Url"
            filter={AutoComplete.fuzzyFilter}
            dataSource={orgrepo.map(repo => `${repo}`)}
            maxSearchResults={5}
            searchText={form.repoUrl}
            onNewRequest={this.handleRepoUrl}
            onUpdateInput={this.handleRepoUrl}
            fullWidth={true}
            errorText={errors.repoUrl && errors.repoUrl.statusText}
          />
          <AutoComplete
            floatingLabelText="Solution Url"
            filter={AutoComplete.fuzzyFilter}
            dataSource={orgrepo.map(repo => `${repo}`)}
            maxSearchResults={5}
            searchText={form.solutionRepoUrl}
            onNewRequest={this.handleSolutionUrl}
            onUpdateInput={this.handleSolutionUrl}
            fullWidth={true}
            errorText={errors.solutionRepoUrl && errors.solutionRepoUrl.statusText}
          />
        </div>
      )
    }
  }

  renderStepActions(step) {
    const { stepIndex, isRepoChecking, canSubmit } = this.state
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
          disabled={!canSubmit}
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
    const { form, errors } = this.state

    return (
      <Paper zDepth={0} style={styles.formPaperStyle}>
        <form>
          <TextField
            floatingLabelText="Name"
            value={form.name}
            fullWidth={true}
            errorText={errors.name && errors.name.statusText}
            onChange={(e) => this.handleChange(e, 'name')}
            onBlur={(e) => this.handleChange(e, 'name')}
          />
          {this.renderOrgInput()}
          {this.renderTeamInput()}
          {this.renderUrlInput()}
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
            onTouchTap={this.handleFileSelect}
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

    if (isFetchingOrgs && !orgs.length) return <div style={styles.center}><CircularProgress size={2} /></div>
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
