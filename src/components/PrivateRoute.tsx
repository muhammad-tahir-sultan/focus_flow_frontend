import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLoadingSkeleton from './AppLoadingSkeleton';

interface PrivateRouteProps {
    children: ReactNode;
    adminOnly?: boolean;
}

const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
    const { user, loading, isAdmin } = useAuth();
    if (loading) return <AppLoadingSkeleton />;

    if (!user) return <Navigate to="/login" />;

    if (adminOnly && !isAdmin()) {
        return <Navigate to="/" />; // Or a generic Not Authorized page
    }

    return children;
};

export default PrivateRoute;
