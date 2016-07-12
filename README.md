[![Stories in Ready](https://badge.waffle.io/jes708/CodeGenius.png?label=ready&title=Ready)](https://waffle.io/jes708/CodeGenius)
# A touch of GENIUS


# CodeGenius


### User Flows

[see some visuals of user flows here](https://www.evernote.com/pub/jwbackes/codegenius)


### File Tree Structure
```
.
+-- browser
|   +-- components <== react components go here
|   |   +-- app
|   |   +-- sidebar
|   |   +-- annotations
|   |   +-- assessments
|   |   |   +-- instructor
|   |   |   |   +-- questions
|   |   |   +-- student
|   |   |   |   +-- evaluations
|   |   +-- dashboards
|   |   |   +-- users
|   |   |   +-- organizations
|   |   |   +-- teams
|   |   +-- collections
|   +-- scss
|  |    ^-- should this be stored
|  |        with REACT components instead of separate?
+-- resources
|   +-- images
|   +-- mockups and UI/UX
+-- seed
    +-- index.js <== replacing seed.js
    +-- ...other seed files
+-- server
|   +-- app
|   +-- db
|   +-- env
|   +-- io
|   +- main.js
|   +- start.js
+-- tests
|  +-- browser
|  +-- server
|  |   ^-- this structure should
|  |       match the browser and
|  |       server filetrees, or the
|  |       spec files should just be
|  |       included in each route
|  |       folder, which I am also in favor of
+-- gulpfile.js <== automagical command line goodness
+-- package.json <== every npm you ever need
+-- Procfile <== for heroku setup
+-- conf.json <== jsdoc configuration
```


# Want to add your skills? Please See Our [Contributor Guidelines](/contributing.md)
