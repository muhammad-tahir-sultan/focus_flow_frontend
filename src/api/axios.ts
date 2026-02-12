import axios from 'axios';
import { BACKEND_URL } from '../constants/api';

const api = axios.create({
    baseURL: BACKEND_URL,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (accessToken: string, refreshToken: string) => {
    refreshSubscribers.map((cb) => cb(accessToken));
    refreshSubscribers = [];

    window.dispatchEvent(new CustomEvent('tokenRefreshed', {
        detail: { accessToken, refreshToken }
    }));
};

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response: { status } = {} } = error;
        const originalRequest = config;

        if (status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const response = await axios.post(`${BACKEND_URL}/auth/refresh`, { refreshToken });
                const { accessToken, refreshToken: newRefreshToken } = response.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                onRefreshed(accessToken, newRefreshToken);
                isRefreshing = false;

                return api(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                refreshSubscribers = [];

                // Refresh failed - logout user
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
