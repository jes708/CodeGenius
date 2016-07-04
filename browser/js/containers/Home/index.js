'use strict'

import React, { Component } from 'react'
import GitHubInvert from '../../shared/GitHubInvert'
import Paper from 'material-ui/Paper'
import { blue300, blue600 } from 'material-ui/styles/colors'

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
    backgroundImage: "url('http://i.imgur.com/3GPNYHn.jpg')",
    backgroundSize: '100%',
    width: '100%',
    height: 'calc(100vh - 56px)',
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
    fontWeight: 100,
    letterSpacing: '1px',
    marginBottom: '20px'
  }
}

export default function Home () {
  return (
    <div style={styles.paperStyle}>
        <div style={styles.header}>CodeGenius</div>
        <hr style={styles.hr} />
        <p style={styles.p}>CodeGenius optimizes the process of evaluating student code assessments<br />so you can get all of your grading done in one sitting.</p>
      <GitHubInvert style={styles.button} href='/auth/github' />
    </div>
  )
}

