'use strict';

export const BASE = '/api'
export const VERSION = '/v1'
function api(routes, id){
  return `${BASE}${VERSION}${routes}${ (typeof id === 'number' ? ('/' + id) : ('')) }`
}

const APIROUTES = {
  annotation: api('/annotations'),
  annotationByCommentId: (commentId) => api(`/comments/${commentId}/annotation`),
  comments: api('/comments'),
  commentById: (id) => api('/comments', id)
}

export default APIROUTES;

// export const ROUTES = new Map()
//   .set('annotation', '/annotation')
//   .set('annotations', '/annotations')
//   .set('annotationsByUserId', (userId)=> `/annotations/${userId}`)
//   .set('annotationById', (annotationId)=> `/annotation/${annotationId}`)
//   .set('annotationsByUserTest', userTestId=> `/usertest/${userTestId}/annotations`)

//
// const APIROUTES = (BASE, VERSION, ROUTES) =>
//     ROUTES
//       .entries()
//       .map( ([key, ROUTE]) => this[key] = `${BASE}${VERSION}${ROUTE}`, {} );
//
// export default APIROUTES;
