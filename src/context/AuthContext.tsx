import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { refreshTokens } from '../api/auth';
import AppLoadingSkeleton from '../components/AppLoadingSkeleton';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    exp: number;
}

interface AuthContextType {
    user: User | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    loading: boolean;
    isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (accessToken && !isTokenExpired(accessToken)) {
                restoreSession(accessToken);
            } else if (refreshToken) {
                await tryRefresh(refreshToken);
            } else {
                logout();
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const isTokenExpired = (token: string): boolean => {
        try {
            const decoded = jwtDecode<User>(token);
            return decoded.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    };

    const restoreSession = (token: string) => {
        try {
            const decoded = jwtDecode<User>(token);
            setUser(decoded);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch {
            logout();
        }
    };

    const tryRefresh = async (refreshToken: string) => {
        try {
            const data = await refreshTokens(refreshToken);
            login(data.accessToken, data.refreshToken);
        } catch {
            logout();
        }
    };

    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        const decoded = jwtDecode<User>(accessToken);
        setUser(decoded);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    if (loading) {
        return <AppLoadingSkeleton />;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
