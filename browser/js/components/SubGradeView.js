'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'

const SubGradeView = ({ open, files, onSelect }) => {
  return (
    <Drawer
      open={open}
      openSecondary={true}>
      <List>
        <ListItem primaryText='Files' />
        { files.map((file, i) => {
          return (
            <ListItem
              key={i}
              primaryText={file}
              onTouchTap={() => { onSelect(file) }}
            />
          )
        })}
      </List>
    </Drawer>
  )
}

SubGradeView.propTypes = {
  open: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default SubGradeView
