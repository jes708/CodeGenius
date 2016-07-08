'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem';

const SubGradeView = ({ open, files, onSelect }) => {
  return (
    <Drawer
      open={open}
      openSecondary={true}>
      <h4 style={{margin: '15px'}}>Files</h4>
        { files.map((file, i) => {
          return (
            <MenuItem
              key={i}
              primaryText={file}
              onTouchTap={() => { onSelect(file) }}
            />
          )
        })}
    </Drawer>
  )
}

SubGradeView.propTypes = {
  open: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default SubGradeView
