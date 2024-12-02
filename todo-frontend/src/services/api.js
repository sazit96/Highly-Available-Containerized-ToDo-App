import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // baseURL: 'http://54.179.22.120:5000',
});

export default API;
