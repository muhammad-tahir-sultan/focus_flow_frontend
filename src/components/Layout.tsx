import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';
import {
    IconHome, IconBrain, IconMagnet, IconLightning, IconIdentity,
    IconPen, IconHistory, IconTrophy, IconFire, IconNutrition, IconLogout
} from './layout/NavbarIcons';

const Layout = ({ children }: { children: ReactNode }) => {
    const { user, logout, isAdmin } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (!user) {
        return <>{children}</>;
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { label: 'Dashboard', path: '/', icon: <IconHome className="nav-svg-icon" style={{ color: '#60a5fa' }} /> },
        { label: 'New Concept', path: '/skills', icon: <IconBrain className="nav-svg-icon" style={{ color: '#d946ef' }} /> },
        { label: 'Attract', path: '/attract_not_chase', icon: <IconMagnet className="nav-svg-icon" style={{ color: '#f43f5e' }} />, adminOnly: true },
        { label: 'Get Clients', path: '/get-clients', icon: <IconLightning className="nav-svg-icon" style={{ color: '#f59e0b' }} />, adminOnly: true },
        { label: 'Identity', path: '/identity', icon: <IconIdentity className="nav-svg-icon" style={{ color: '#22d3ee' }} />, adminOnly: true },
        { label: 'Log Today', path: '/log', icon: <IconPen className="nav-svg-icon" style={{ color: '#4ade80' }} /> },
        { label: 'History', path: '/history', icon: <IconHistory className="nav-svg-icon" style={{ color: '#fb923c' }} /> },
        { label: 'Goals', path: '/goals', icon: <IconTrophy className="nav-svg-icon" style={{ color: '#facc15' }} /> },
        { label: 'Elite Projects', path: '/practice-projects', icon: <IconFire className="nav-svg-icon" style={{ color: '#a78bfa' }} />, adminOnly: true },
        { label: 'Nutrition', path: '/calories', icon: <IconNutrition className="nav-svg-icon" style={{ color: '#34d399' }} /> },
    ];

    const filteredNavItems = navItems.filter(item => !item.adminOnly || isAdmin());

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
                        {filteredNavItems.map((item) => (
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
                            <span className="nav-icon"><IconLogout className="nav-svg-icon" /></span>
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
