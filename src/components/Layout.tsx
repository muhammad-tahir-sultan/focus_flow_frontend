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
            <header className="flex-between" style={{ padding: '2rem 0', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>FocusFlow</h1>
                <nav style={{ display: 'flex', gap: '1.5rem' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                color: location.pathname === item.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: location.pathname === item.path ? '600' : '400',
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <button onClick={logout} style={{ background: 'none', color: 'var(--error-color)' }}>
                        Logout
                    </button>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
