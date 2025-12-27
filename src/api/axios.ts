import axios from 'axios';
import { BACKEND_URL } from '../constants/api';

const api = axios.create({
    baseURL: BACKEND_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
