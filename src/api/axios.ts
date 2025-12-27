import axios from 'axios';
import { backendUrl } from '../main';

const api = axios.create({
    baseURL: backendUrl,
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
