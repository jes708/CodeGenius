# Contributing to CodeGenius

If you're reading this, you're probably a special person, who we hope is ready to bring their crazy skills to help CodeGenius make coding a smarter, more collaborative experience. Read on to learn more about the CodeGenius project and how to get involved.


### Important Resources
> Repository: https://github.com/jes708/CodeGenius

> Documentation: (coming soon)

> Communications: (coming soon)


### People:
- [@jancodes](http://github.com/jancodes)
- [@jdhang](http://github.com/jdhang)
- [@jes708](http://github.com/jes708)
- [@thejohnbackes](http://github.com/thejohnbackes)


# About CodeGenius

## CodeGenius Use Cases
We believe you should be able to smartly annotate any code, anywhere. How is this useful?


### Code Reviews


### Classroom Assessments


### Code reference


### Learning Code


### Code Discovery


### Bug Zapping


# Contributor Guidelines
We have written these guidelines

## Code of conduct
This project adheres to the Contributor Covenant code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project administrators.


## Git workflow tips:
- consider using "Git Stash" instead of git commit for half-finished work. This is also a nice way of cleaning up your finished commits.
- Use descriptive commit messages.
- No pushing to master.
- No merging your own pull requests.
- Code that is not tested isn't done. Administrators should not merge untested pull requests.
- Keep features bite-sized, and commit often. 30 minutes is a good benchmark.
- In your pull request, describe what you've done in your code. It is difficult to read uncommented or undescribed code.
- Consider using JSDoc to document the code that you commit.


## Issues
Submit a ticket for your issue, assuming one does not already exist.
Clearly describe the issue including steps to reproduce when it is a bug.
Make sure you fill in the earliest version that you know has the issue.
Fork the repository on GitHub


## Running CodeGenius


## Error handline
Errors should be passed using the __error() handler in server/utils.js


## Specs Styleguide

Include thoughtfully-worded, well-structured Mocha specs in the ./spec folder.
Treat "describe" as a noun or situation.
Treat "it" as a statement about state or how an operation changes state.
Preference for Chai's "should" syntax.


#### Example
```
describe 'a dog', ->
 it 'barks', ->
 # spec here
 describe 'when the dog is happy', ->
  it 'wags its tail', ->
  # spec here
```
