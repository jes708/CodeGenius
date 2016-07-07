'use strict'

import React, { PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import IconButton from 'material-ui/IconButton'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AlertError from 'material-ui/svg-icons/alert/error'
import ImageLens from 'material-ui/svg-icons/image/lens'
import styles from '../graderStyles'
import { green500, red500 } from 'material-ui/styles/colors'

const StudentCard = ({studentTest, onSelect, onToggle }) => {

  const { user, userId, isStudent } = studentTest
  let style = isStudent ? styles.infoCard : styles.inactiveCard;

  const renderIcon = () => {
    if (studentTest.isGraded) {
      return (
        <IconButton 
        tooltip='Fully graded' 
        tooltipPosition='bottom-left'
        style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)}
        >
          <ActionCheckCircle
            style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)}
            color={green500}
          />
        </IconButton>
      )
    } else if (!studentTest.repoUrl) {
      return (
        <IconButton 
        tooltip='Repo not found!' 
        tooltipPosition='bottom-left'
        style={Object.assign({}, styles.toggle, styles.studentIcon, styles.svgOutline)}
        >
          <AlertError
            
            color={red500}
          />
        </IconButton>
      )
    } else {
      return (
        <ImageLens
          style={Object.assign({}, styles.toggle, styles.studentIcon)}
          color={'transparent'}
        />
      )
    }
  }

  return (
    <Card style={Object.assign({}, style, styles.skinny, styles.roundedCard)}>
      <div style={styles.gradingInfo}>
        <div style={Object.assign({}, styles.gradingSubtitle, styles.studentCardSelect)}
          onClick={() => { onSelect(user.id) }}>
          <img src={user.photo} alt={user.name} style={styles.student}/>
          {user.name}
        </div>
        {renderIcon()}
        <Toggle toggled={isStudent} onToggle={() => onToggle(userId, !isStudent)} style={styles.toggle}/>
      </div>
    </Card>
  )
}

StudentCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  studentTest: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default StudentCard
