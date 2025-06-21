import axios from 'axios';
import { baseURL } from './URL';

const axiosInstance = axios.create({
  baseURL,
 
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor (e.g., for handling 401 errors globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: redirect to login or handle token expiration
      console.log('Unauthorized - redirecting to login');
      window.location.href = "/login"
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
