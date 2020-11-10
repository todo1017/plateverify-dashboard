import axios from 'axios';

axios.defaults.withCredentials = true;
// const baseURL = 'https://api.ejsdevelopment.com/';
const baseURL = process.env.REACT_APP_SERVER;
const token = localStorage.getItem('token') || ''

const api = axios.create({
  baseURL,
  headers: {
    'Authorization' : 'Bearer ' + token
  }
});

api.interceptors.response.use(
  response => response,
  error => {
  if (error.response && error.response.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return false;
});

export default api;