'use strict'

import React, { PropTypes } from 'react'
import CircularProgress from 'material-ui/CircularProgress'

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
  if (isFetching) {
    return (
      <div style={Object.assign(styles.gradingPane, styles.paperStyle)}>
        <CircularProgress size={2} />
      </div>
    )
  } else return children
}

CheckLoading.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

export default CheckLoading
