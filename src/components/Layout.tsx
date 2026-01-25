import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (!user) {
        return <>{children}</>;
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { label: 'Dashboard', path: '/', icon: '🏠' },
        { label: 'NEXT PATH', path: '/next-path', icon: '🎯' },
        { label: 'Clean Code', path: '/clean-code', icon: '🧼' },
        { label: 'Skills', path: '/skills', icon: '🧠' },
        { label: 'Attract', path: '/attract_not_chase', icon: '🧲' },
        { label: 'Identity', path: '/identity', icon: '🧱' },
        { label: 'Log Today', path: '/log', icon: '✍️' },
        { label: 'History', path: '/history', icon: '📜' },
        { label: 'Goals', path: '/goals', icon: '🏆' },
    ];

    return (
        <div>
            <header className="app-header">
                <div className="container header-inner">
                    <Link to="/" className="header-logo" onClick={() => setIsMenuOpen(false)}>
                        <img src="/focus_flow_favicon.png" alt="FocusFlow Logo" className="logo-img" />
                        <h1 className="logo-text">FocusFlow</h1>
                    </Link>

                    <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav className={`header-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                            </Link>
                        ))}
                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="logout-btn">
                            <span className="nav-icon">🚪</span>
                            <span className="nav-label">Logout</span>
                        </button>
                    </nav>
                </div>

                {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
            </header>
            <main className="container">{children}</main>
        </div>
    );
};

export default Layout;
