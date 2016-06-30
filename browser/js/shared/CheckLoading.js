'use strict'

import React, { Component } from 'react'

const styles = {
  paperStyle: {
    height: '100%',
    overflow: 'scroll'
  },
  gradingPane: {
    backgroundColor: '#64B5F6'
  }
}

const CheckLoading = ({ children, isFetching }) => {
  console.log(isFetching)
  if (isFetching) {
    return (
      <div style={Object.assign(styles.gradingPane, styles.paperStyle)}>
        <h1 style={{textAlign: 'center'}}>Loading...</h1>
      </div>
    )
  } else return children
}

export default CheckLoading
