'use strict';

export const BASE = '/api'
export const VERSION = '/v1'
function api(routes){
  return `${BASE}${VERSION}${routes}`
}

const APIROUTES = {
  annotation: api('/annotations')
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
