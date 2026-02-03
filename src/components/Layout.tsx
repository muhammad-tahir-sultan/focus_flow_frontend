import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';
import {
    IconHome, IconBrain, IconMagnet, IconLightning, IconIdentity,
    IconPen, IconHistory, IconTrophy, IconFire, IconNutrition, IconLogout, IconDumbbell
} from './layout/NavbarIcons';

const Layout = ({ children }: { children: ReactNode }) => {
    const { user, logout, isAdmin } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!user) {
        return <>{children}</>;
    }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    // Keyboard shortcut: Ctrl+B or Cmd+B to toggle sidebar
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check for Ctrl+B (Windows/Linux) or Cmd+B (Mac)
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault(); // Prevent browser's default bookmark action
                toggleCollapse();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isCollapsed]); // Re-create listener when isCollapsed changes

    const navItems = [
        { label: 'Dashboard', path: '/', icon: <IconHome className="nav-svg-icon" style={{ color: '#60a5fa' }} /> },
        { label: 'New Concept', path: '/skills', icon: <IconBrain className="nav-svg-icon" style={{ color: '#d946ef' }} /> },
        { label: 'Attract', path: '/attract_not_chase', icon: <IconMagnet className="nav-svg-icon" style={{ color: '#f43f5e' }} />, adminOnly: true },
        { label: 'Get Clients', path: '/get-clients', icon: <IconLightning className="nav-svg-icon" style={{ color: '#f59e0b' }} />, adminOnly: true },
        { label: 'Identity', path: '/identity', icon: <IconIdentity className="nav-svg-icon" style={{ color: '#22d3ee' }} />, adminOnly: true },
        { label: 'Fitness', path: '/fitness', icon: <IconDumbbell className="nav-svg-icon" style={{ color: '#ec4899' }} /> },
        { label: 'Log Today', path: '/log', icon: <IconPen className="nav-svg-icon" style={{ color: '#4ade80' }} /> },
        { label: 'History', path: '/history', icon: <IconHistory className="nav-svg-icon" style={{ color: '#fb923c' }} /> },
        { label: 'Goals', path: '/goals', icon: <IconTrophy className="nav-svg-icon" style={{ color: '#facc15' }} /> },
        { label: 'Elite Projects', path: '/practice-projects', icon: <IconFire className="nav-svg-icon" style={{ color: '#a78bfa' }} />, adminOnly: true },
        { label: 'Nutrition', path: '/calories', icon: <IconNutrition className="nav-svg-icon" style={{ color: '#34d399' }} /> },
    ];

    const filteredNavItems = navItems.filter(item => !item.adminOnly || isAdmin());

    return (
        <div className="app-layout">
            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo" onClick={() => setIsSidebarOpen(false)}>
                        <img src="/focus_flow_favicon.png" alt="FocusFlow Logo" className="sidebar-logo-img" />
                        {!isCollapsed && <h1 className="sidebar-logo-text">FocusFlow</h1>}
                    </Link>

                    {/* Desktop Collapse Toggle */}
                    <button
                        className="sidebar-collapse-btn"
                        onClick={toggleCollapse}
                        aria-label={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
                        title={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`collapse-icon ${isCollapsed ? 'rotated' : ''}`}
                        >
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => setIsSidebarOpen(false)}
                            title={isCollapsed ? item.label : ''}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
                            {!isCollapsed && location.pathname === item.path && <div className="sidebar-active-indicator" />}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button
                        onClick={() => { logout(); setIsSidebarOpen(false); }}
                        className="sidebar-logout"
                        title={isCollapsed ? "Logout" : ''}
                    >
                        <span className="sidebar-icon"><IconLogout className="nav-svg-icon" /></span>
                        {!isCollapsed && <span className="sidebar-label">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Toggle Button */}
            <button className={`sidebar-toggle ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar} aria-label="Toggle Sidebar">
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Overlay for mobile */}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

            {/* Main Content */}
            <main className={`main-content ${isCollapsed ? 'expanded' : ''}`}>
                <div className="container">{children}</div>
            </main>
        </div>
    );
};

export default Layout;
