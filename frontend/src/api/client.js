import axios from 'axios';

const DEFAULT_API_URL = import.meta.env.PROD
  ? 'https://societyos-society-management-system.onrender.com/api'
  : 'http://localhost:5000/api';

const normalizeApiUrl = (value) => {
  let url = String(value || DEFAULT_API_URL).trim().replace(/\/+$/, '');
  url = url.replace(/\/login$/i, '').replace(/\/api\/api$/i, '/api');
  return /\/api$/i.test(url) ? url : `${url}/api`;
};

export const API_URL = normalizeApiUrl(import.meta.env.VITE_API_URL || (
  import.meta.env.PROD
    ? 'https://societyos-society-management-system.onrender.com/api'
    : 'http://localhost:5000/api'
));
export const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong';
