import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    if (!user) {
        return <div className="container" style={{ marginTop: '4rem' }}>{children}</div>;
    }

    const navItems = [
        { label: 'Dashboard', path: '/' },
        { label: 'Goals', path: '/goals' },
        { label: 'Log Today', path: '/log' },
        { label: 'History', path: '/history' },
    ];

    return (
        <div className="container">
            <header className="app-header">
                <Link to="/" className="header-logo">
                    <img src="/focus_flow_favicon.png" alt="FocusFlow Logo" className="logo-img" />
                    <h1 className="logo-text">FocusFlow</h1>
                </Link>
                <nav className="header-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <button onClick={logout} className="logout-btn">
                        Logout
                    </button>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
