import axios from 'axios';

const API = axios.create({
  baseURL: 'http://54.151.156.55:5000', // baseURL: 'http://54.151.156.55:5000',
});

export default API;
