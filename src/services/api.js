import axios from "axios";

// const BASE_URl = import.meta.env.VITE_API_URL || "http://localhost:8000"
const BASE_URl = 'http://localhost:8000'
// console.log("API Base URL:", BASE_URl); // Debug log

const api = axios.create({
  baseURL:`${BASE_URl}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
