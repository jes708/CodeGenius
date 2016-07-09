'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import GitHubInvert from '../../shared/GitHubInvert'
import Paper from 'material-ui/Paper'
import { blue300, blue600 } from 'material-ui/styles/colors'
import Snackbar from 'material-ui/Snackbar';
import { Router } from 'react-router'

const styles = {
  header: {
    textAlign: 'center',
    fontSize: '100px',
    color: '#fdfdfd',
    fontWeight: 900,
    fontFamily: 'Helvetica Neue',
    textShadow: '0px 0px 10px black'
  },
  paperHeader: {
    backgroundColor: blue600,
    padding: '20px',
    marginBottom:'60px'
  },
  paperStyle: {
    background: 'url("http://i.imgur.com/3GPNYHn.jpg") no-repeat center center fixed',
    WebkitBackgroundSize: 'cover',
    MozBackgroundSize: 'cover',
    OBackgroundSize: 'cover',
    backgroundSize: 'cover',
    width: '100%',
    height: 'calc(100vh)',
    // height: 'calc(100vh - 56px)',
    textAlign: 'center',
    padding: '25vh',
    paddingTop: '15vh',
    paddingBottom: '20vh',
  },
  button: {
    boxShadow: '0px 0px 10px black',
  },
  hr: {
    marginTop: 0,
    border: '0',
    height: '1px',
    width: '50%',
    backgroundImage: 'linear-gradient(to right, transparent, white, transparent)'
  },
  p: {
    fontSize: '23px',
    color: 'white',
    fontWeight: 200,
    textShadow: '0px 0px 10px black, 0px 0px 10px black, 0px 0px 10px black',
    letterSpacing: '1px',
    marginBottom: '20px'
  },
  center: {
    textAlign: 'center'
  }
}

class Home extends Component {

  render () {

      return (
        <div>
          <div style={styles.paperStyle}>
            <div style={styles.header}>CodeGenius</div>
            <hr style={styles.hr} />
            <p style={styles.p}>CodeGenius optimizes the process of evaluating student code assessments<br />so you can get all of your grading done in one sitting.</p>
            <GitHubInvert style={styles.button} href='/auth/github' />
          </div>
          {this.props.pathName
            ? <Snackbar
              open={this.props.pathName}
              message="You must be logged in."
              autoHideDuration={4000}
              style={styles.center}
              />
            : null
          }
        </div>
      )

  }
}

const mapStateToProps = (state) => {
  const { session } = state

  return {
    isFetching: session.isFetching,
    pathName: session.path
  }
}

export default connect(mapStateToProps)(Home)
