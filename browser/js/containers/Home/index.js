'use strict'

import React, { Component } from 'react'
import GitHubButton from '../../shared/GitHubButton'


export default function Home () {
  return (
    <div className='container'>
      <GitHubButton href='/auth/github' />
    </div>
  )
}

