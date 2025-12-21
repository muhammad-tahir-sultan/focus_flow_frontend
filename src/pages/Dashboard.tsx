import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { backendUrl } from '../main';

interface DashboardStats {
    streak: number;
    activeGoals: number;
    logsThisWeek: number;
}

interface Log {
    date: string;
}

interface Goal {
    status: string;
}

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats>({ streak: 0, activeGoals: 0, logsThisWeek: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [logsRes, goalsRes] = await Promise.all([
                    axios.get<Log[]>(`${backendUrl}/daily-logs`),
                    axios.get<Goal[]>(`${backendUrl}/goals`)
                ]);

                const logs = logsRes.data;
                const goals = goalsRes.data;

                // Calculate Streak (Simplified: consecutive days ending today or yesterday)
                let streak = 0;
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Sort logs descending
                const sortedLogs = logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                if (sortedLogs.length > 0) {
                    const lastLogDate = new Date(sortedLogs[0].date);
                    lastLogDate.setHours(0, 0, 0, 0);

                    const diffTime = Math.abs(today.getTime() - lastLogDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays <= 1) {
                        streak = 1;
                        // Check previous days
                        for (let i = 1; i < sortedLogs.length; i++) {
                            const prevDate = new Date(sortedLogs[i - 1].date);
                            const currDate = new Date(sortedLogs[i].date);
                            prevDate.setHours(0, 0, 0, 0);
                            currDate.setHours(0, 0, 0, 0);

                            const gap = (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24);
                            if (gap === 1) {
                                streak++;
                            } else {
                                break;
                            }
                        }
                    }
                }

                // Active Goals
                const activeGoals = goals.filter(g => g.status === 'Active').length;

                // Logs this week
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
                const logsThisWeek = logs.filter(l => new Date(l.date) >= startOfWeek).length;

                setStats({ streak, activeGoals, logsThisWeek });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="container">Loading...</div>;

    const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="flex-between mb-8">
                <div>
                    <h2 className="heading-lg" style={{ color: 'var(--text-secondary)' }}>Today is</h2>
                    <h1 className="heading-xl">{todayDate}</h1>
                </div>
                <Link to="/vision" className="btn" style={{
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid var(--primary-color)',
                    color: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    ✨ View Long-term Vision
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card">
                    <h3 className="text-sm">Current Streak</h3>
                    <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--accent-color)' }}>{stats.streak} <span style={{ fontSize: '1rem' }}>days</span></div>
                </div>
                <div className="card">
                    <h3 className="text-sm">Active Goals</h3>
                    <div style={{ fontSize: '3rem', fontWeight: '700' }}>{stats.activeGoals}</div>
                </div>
                <div className="card">
                    <h3 className="text-sm">Logs This Week</h3>
                    <div style={{ fontSize: '3rem', fontWeight: '700' }}>{stats.logsThisWeek}</div>
                </div>
            </div>

            <div className="flex-between" >
                <h2 className="heading-lg">Quick Actions</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <Link to="/log" className="btn btn-primary" style={{ textAlign: 'center', display: 'block' }}>
                    Log Daily Execution
                </Link>
                <Link to="/goals" className="btn" style={{ textAlign: 'center', display: 'block', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>
                    Manage Goals
                </Link>
            </div>

            <div className="card mb-8" style={{ borderLeft: '4px solid var(--accent-color)' }}>
                <h3 className="heading-lg mb-4">Daily Non-Negotiables</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-color)' }}>•</span>
                        <strong>Career & Income:</strong> 10 Client Outreach + 1 LinkedIn Post
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-color)' }}>•</span>
                        <strong>Physique:</strong> Workout (45 mins) + Reduce Tea (2x)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-color)' }}>•</span>
                        <strong>Degree:</strong> Study Degree Subjects (1 hour)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-color)' }}>•</span>
                        <strong>Communication:</strong> Practice English (Reading/Speaking 30 mins)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-color)' }}>•</span>
                        <strong>Skills:</strong> Learn/Code New Tech (1 hour)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-color)' }}>•</span>
                        <strong>Mindset:</strong>
                        <Link to="/control-list" style={{ color: 'inherit', textDecoration: 'none', marginLeft: '0.25rem' }} className="hover-link">
                            Control List Review
                        </Link>
                        + Daily Reflection
                    </li>
                </ul>
            </div>

            <div className="card mb-8" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                <h3 className="heading-lg mb-4">6 Months Goal Target</h3>

                <div className="mb-6">
                    <h4 style={{ color: 'var(--error-color)', marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔥 Core (Daily Non-Negotiable)</h4>
                    <ol style={{ paddingLeft: '1.5rem', display: 'grid', gap: '0.75rem' }}>
                        <li>
                            <Link to="/roadmap/revenue-engine" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                                <strong>Revenue Engine</strong> (Income + Clients)
                            </Link>
                        </li>
                        <li>
                            <Link to="/roadmap/skills" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                                <strong>Tech Skills</strong> (NestJS Phase 1)
                            </Link>
                            <div style={{ marginTop: '0.5rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    {['NestJS (Advanced)', 'GraphQL', 'Prisma', 'DB Mastery', 'System Design'].map(skill => (
                                        <span key={skill} style={{
                                            backgroundColor: 'rgba(59, 130, 246, 0.15)',
                                            border: '1px solid var(--accent-color)',
                                            color: 'var(--accent-color)',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/roadmap/physique" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                                <strong>Physique & Energy</strong>
                            </Link>
                        </li>
                    </ol>
                </div>

                <div>
                    <h4 style={{ color: 'var(--success-color)', marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔄 Rotational (Alternate Days)</h4>
                    <ol style={{ paddingLeft: '1.5rem', display: 'grid', gap: '0.75rem' }}>
                        <li>
                            <Link to="/roadmap/english" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                                <strong>English Communication</strong> (3x/Week)
                            </Link>
                        </li>
                        <li>
                            <Link to="/roadmap/degree" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                                <strong>Degree Completion</strong> (Class Days)
                            </Link>
                        </li>
                        <li>
                            <Link to="/roadmap/better-day" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                                <strong>Better Day</strong> (Mindset)
                            </Link>
                        </li>
                        <li>
                            <Link to="/roadmap/rate-myself" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                                <strong>Self-Rating</strong> (Binary Check)
                            </Link>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
