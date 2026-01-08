import api from './axios';

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
};

interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
};

export const logoutUser = async (): Promise<void> => {
    await api.post('/auth/logout');
};

export const refreshTokens = async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
    return response.data;
};
