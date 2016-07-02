'use strict'

import React, { Component } from 'react'
import GitHubButton from '../../shared/GitHubButton'
import Paper from 'material-ui/Paper'
import { blue300, blue600 } from 'material-ui/styles/colors'

const styles = {
  header: {
    textAlign: 'center',
    fontSize: '60px',
    color: '#fdfdfd',
    fontWeight: '300'
  },
  paperHeader: {
    backgroundColor: blue600,
    padding: '20px',
    marginBottom:'60px'
  },
  paperStyle: {
    backgroundColor: blue300,
    width: '100%',
    height: 'calc(100vh - 56px)',
    textAlign: 'center',
    padding: '25vh',
    paddingTop: '15vh',
    paddingBottom: '20vh',
  }
}

export default function Home () {
  return (
    <div style={styles.paperStyle}>
      <Paper zDepth={3} style={styles.paperHeader}>
        <div style={styles.header}>Welcome to CodeGenius!</div>
      </Paper>
      <GitHubButton href='/auth/github' />
    </div>
  )
}

