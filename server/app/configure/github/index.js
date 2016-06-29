'use strict'

import GitHubApi from 'github'
import Promise from 'bluebird'
import _ from 'lodash'

const github = new GitHubApi({
  debug: true,
  protocol: 'https',
  host: "api.github.com",
  // pathPrefix: "/api/v3",
  headers: {
      "user-agent": "CodeGenius" // GitHub is happy with a unique user agent
  },
  Promise: require('sequelize').Promise,
  // followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
  timeout: 5000
})

let GitHub = {}

Object.keys(github).map(key => {
  if (typeof github[key] === 'object') {
    GitHub[key] = Promise.promisifyAll(github[key])
  }
})

GitHub = Object.assign(github, GitHub)

module.exports = GitHub
