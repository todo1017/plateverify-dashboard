import axios from 'axios';

axios.defaults.withCredentials = true;
// const baseURL = 'https://api.ejsdevelopment.com/';
const baseURL = 'http://localhost:8002/';
const token = localStorage.getItem('token') || ''

const api = axios.create({
  baseURL,
  headers: {
    'Authorization' : 'Bearer ' + token
  }
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;