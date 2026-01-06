import api from './axios';

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
};

interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

export const registerUser = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', credentials);
    return response.data;
};
