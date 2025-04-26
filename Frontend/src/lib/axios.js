
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor
// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.code === 'ECONNABORTED') {
//       console.error('Request timeout');
//       throw new Error('Request took too long');
//     }
//     if (!error.response) {
//       console.error('Network Error - Server may be down');
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;