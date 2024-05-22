import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = sessionStorage.getItem('token');
    return config;
  },
  (error) => Promise.reject(error),
);

export default axios;
