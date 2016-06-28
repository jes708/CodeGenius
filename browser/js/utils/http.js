import axios from 'axios';

function getOrganizations() {
  return axios.get('/api/v1/organizations')
}