'use strict';


const SAMPLE_COMMENTS = [
  {
    title: "First really great thing",
    markdown: String.raw`#static files
    (from the static folder in the public folder) on /files route,
    handles internal server errors,
    handles custom errors`,
    tags: [
      {name: 'foo', color: '#3F51B5'},
      {name: 'bar', color: '#3F32A9'},
      {name: 'bar', color: '#4A1EB5'},
      {name: 'bar', color: '#3F51B5'}
    ]
  },
  {
    title: "Second really great thing",
    markdown: `static files (from the static folder in the public folder) on /files route,
    handles internal server errors,
    handles custom errors`,
    tags: [
      {name: 'bar', color: '#3F51B5'}
    ]
  }
]

export default SAMPLE_COMMENTS;
