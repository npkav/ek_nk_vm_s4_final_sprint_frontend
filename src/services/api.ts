import axios from 'axios';

export const API_URL = 'http://localhost:8080/api';

export const API_CLIENT = axios.create({
  baseURL: API_URL,
  headers: {'Content-Type': 'application/json'},
});

API_CLIENT.interceptors.request.use(
  (config) => {
    console.log(`API REQUEST: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API REQUEST ERROR:', error);
    return Promise.reject(error);
  }
);

API_CLIENT.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage;
    if (error.response?.data) {errorMessage = error.response.data;}
    else {errorMessage = error.message;}
    console.error('API RESPONSE ERROR:', errorMessage);
    return Promise.reject(error);
  }
);

export default API_CLIENT;