'use strict'

import GitHubApi from 'github'

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

module.exports = github
