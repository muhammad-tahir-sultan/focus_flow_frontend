import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { backendUrl } from '../main';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import ExecutionStreakChart from '../components/charts/ExecutionStreakChart';
import TimeInvestedChart from '../components/charts/TimeInvestedChart';
import NonNegotiablesChart from '../components/charts/NonNegotiablesChart';
import ConsistencyChart from '../components/charts/ConsistencyChart';
import '../styles/dashboard.css';

interface DashboardStats {
    streak: number;
    activeGoals: number;
    logsThisWeek: number;
    avgFocus?: number;
}

interface Log {
    date: string;
}

interface Goal {
    status: string;
}

const Dashboard = () => {
    const { isAdmin } = useAuth();
    const [stats, setStats] = useState<DashboardStats>({ streak: 0, activeGoals: 0, logsThisWeek: 0 });
    const [loading, setLoading] = useState(true);
    const [showGraphs, setShowGraphs] = useState(true);

    // Analytics data
    const [streakData, setStreakData] = useState<{ date: string; value: number }[]>([]);
    const [timeData, setTimeData] = useState<{ date: string; value: number }[]>([]);
    const [nonNegotiablesData, setNonNegotiablesData] = useState({ completedCount: 0, totalCount: 0 });
    const [consistencyData, setConsistencyData] = useState<{ week: number; value: number }[]>([]);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [analyticsError, setAnalyticsError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [logsRes, goalsRes, backendStatsRes] = await Promise.all([
                    axios.get<Log[]>(`${backendUrl}/daily-logs`),
                    axios.get<Goal[]>(`${backendUrl}/goals`),
                    axios.get<any>(`${backendUrl}/daily-logs/stats`)
                ]);

                const logs = logsRes.data;
                const goals = goalsRes.data;
                const backendStats = backendStatsRes.data;

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Active Goals
                const activeGoals = goals.filter(g => g.status === 'Active').length;

                // Logs this week
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
                const logsThisWeek = logs.filter(l => new Date(l.date) >= startOfWeek).length;

                setStats({
                    streak: backendStats.streak,
                    activeGoals,
                    logsThisWeek,
                    avgFocus: backendStats.avgFocus
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setAnalyticsLoading(true);
                const [streakRes, timeRes, nonNegRes, consistencyRes] = await Promise.all([
                    axios.get(`${backendUrl}/daily-logs/analytics/streak`),
                    axios.get(`${backendUrl}/daily-logs/analytics/time-invested`),
                    axios.get(`${backendUrl}/daily-logs/analytics/non-negotiables`),
                    axios.get(`${backendUrl}/daily-logs/analytics/consistency`),
                ]);

                setStreakData(streakRes.data);
                setTimeData(timeRes.data);
                setNonNegotiablesData(nonNegRes.data);
                setConsistencyData(consistencyRes.data);
            } catch (err) {
                console.error(err);
                setAnalyticsError('Failed to load analytics data');
            } finally {
                setAnalyticsLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <Loader />;

    const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="dashboard-page">
            <div className="bg-gradient"></div>

            <div className="dashboard-content">
                <div className="dashboard-header mb-8">
                    <div>
                        <h2 className="text-sm" style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today is</h2>
                        <h1 className="heading-xl">{todayDate}</h1>
                    </div>
                    {isAdmin() && (
                        <Link to="/vision" className="btn-vision">
                            ✨ Long-term Vision
                        </Link>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div className="stats-card-main">
                        <h3 className="text-sm">Current Streak</h3>
                        <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#3b82f6', lineHeight: 1, margin: '1rem 0 0.5rem' }}>{stats.streak} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>days</span></div>
                    </div>
                    <div className="stats-card-main">
                        <h3 className="text-sm">Active Goals</h3>
                        <div style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1, margin: '1rem 0 0.5rem' }}>{stats.activeGoals}</div>
                    </div>
                    <div className="stats-card-main">
                        <h3 className="text-sm">Logs This Week</h3>
                        <div style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1, margin: '1rem 0 0.5rem' }}>{stats.logsThisWeek}</div>
                    </div>
                </div>

                <div className="flex-between" >
                    <h2 className="heading-lg">Quick Actions</h2>
                </div>
                <div className="quick-actions-grid">
                    <Link to="/log" className="action-btn btn-primary">
                        🚀 Log Daily Execution
                    </Link>
                    <Link to="/goals" className="action-btn btn-secondary">
                        🎯 Manage Goals
                    </Link>
                </div>

                {isAdmin() && (
                    <div className="card mb-8 non-negotiables-card">
                        <h3 className="heading-lg mb-4">Daily Non-Negotiables</h3>
                        <ul className="non-negotiables-list">
                            <li className="non-negotiable-item">
                                <span className="bullet">•</span>
                                <strong>Career & Income:</strong> 10 Client Outreach + 1 LinkedIn Post
                            </li>
                            <li className="non-negotiable-item">
                                <span className="bullet">•</span>
                                <strong>Physique:</strong> Workout (45 mins) + Reduce Tea (2x)
                            </li>
                            <li className="non-negotiable-item">
                                <span className="bullet">•</span>
                                <strong>Degree:</strong> Study Degree Subjects (1 hour)
                            </li>
                            <li className="non-negotiable-item">
                                <span className="bullet">•</span>
                                <strong>Communication:</strong> Practice English (Reading/Speaking 30 mins)
                            </li>
                            <li className="non-negotiable-item">
                                <span className="bullet">•</span>
                                <strong>Skills:</strong> Learn/Code New Tech (1 hour)
                            </li>
                            <li className="non-negotiable-item">
                                <span className="bullet">•</span>
                                <strong>Mindset:</strong>
                                <Link to="/control-list" className="hover-link" style={{ marginLeft: '0.25rem' }}>
                                    Control List Review
                                </Link>
                                + Daily Reflection
                            </li>
                        </ul>
                    </div>
                )}

                {isAdmin() && (
                    <div className="card mb-8 goals-card">
                        <div className="flex-between mb-4">
                            <h3 className="heading-lg" style={{ margin: 0 }}>6 Months Goal Target</h3>
                            <Link to="/roadmaps" className="hover-link" style={{ fontSize: '0.9rem' }}>
                                View All Roadmaps
                            </Link>
                        </div>

                        <div className="mb-6">
                            <h4 className="goal-section-title goal-core">🔥 Core (Daily Non-Negotiable)</h4>
                            <ol className="goals-list">
                                <li>
                                    <Link to="/roadmap/revenue-engine" className="hover-link">
                                        <strong>Revenue Engine</strong> (Income + Clients)
                                    </Link>
                                </li>
                                <li>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                        <Link to="/roadmap/skills" className="hover-link">
                                            <strong>Tech Skills</strong> (NestJS Phase 1)
                                        </Link>
                                        <Link to="/google-roadmap" className="badge badge-filled" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                            🎯 Google L3 Path
                                        </Link>
                                        <Link to="/next-path" className="badge badge-filled" style={{ textDecoration: 'none', cursor: 'pointer', background: 'rgba(139, 92, 246, 0.2)', borderColor: 'rgba(139, 92, 246, 0.4)', color: '#a78bfa' }}>
                                            🔥 YOUR NEXT PATH (Clear Decision)
                                        </Link>
                                    </div>
                                    <div className="skills-container">
                                        <div className="skills-badges">
                                            {['NestJS (Advanced)', 'GraphQL', 'Prisma', 'DB Mastery', 'System Design'].map(skill => (
                                                <span key={skill} className="skill-badge">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <Link to="/roadmap/physique" className="hover-link">
                                        <strong>Physique & Energy</strong>
                                    </Link>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h4 className="goal-section-title goal-rotational">🔄 Rotational (Alternate Days)</h4>
                            <ol className="goals-list">
                                <li>
                                    <Link to="/roadmap/english" className="hover-link">
                                        <strong>English Communication</strong> (3x/Week)
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/roadmap/degree" className="hover-link">
                                        <strong>Degree Completion</strong> (Class Days)
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/roadmap/better-day" className="hover-link">
                                        <strong>Better Day</strong> (Mindset)
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/roadmap/rate-myself" className="hover-link">
                                        <strong>Self-Rating</strong> (Binary Check)
                                    </Link>
                                </li>
                            </ol>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-800">
                            <h4 className="goal-section-title" style={{ opacity: 0.7, fontSize: '0.9rem' }}>📁 Postponed / Reference Roadmaps</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Link to="/google-roadmap" className="badge badge-outline">Google Roadmap</Link>
                                <Link to="/backend-graph" className="badge badge-outline">Backend Graph</Link>
                                <Link to="/project-graph" className="badge badge-outline">Project Graph</Link>
                                <Link to="/master-roadmap" className="badge badge-outline">Master Roadmap</Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Discipline Graphs */}
                <div className="card" style={{ marginTop: '3rem' }}>
                    <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <h2 className="heading-lg">Execution Truth</h2>
                        <button
                            onClick={() => setShowGraphs(!showGraphs)}
                            className="btn btn-toggle"
                        >
                            {showGraphs ? 'Hide Graphs' : 'Show Graphs'}
                        </button>
                    </div>

                    {showGraphs && (
                        <>
                            {analyticsLoading ? (
                                <Loader />
                            ) : analyticsError ? (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--error-color)' }}>
                                    {analyticsError}
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gap: '3rem' }}>
                                    {/* Execution Streak */}
                                    <div>
                                        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
                                            Daily Execution Streak (Last 30 Days)
                                        </h3>
                                        {streakData.length > 0 ? (
                                            <ExecutionStreakChart data={streakData} />
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                                No data available
                                            </div>
                                        )}
                                    </div>

                                    {/* Time Invested */}
                                    <div>
                                        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
                                            Daily Time Invested (Last 14 Days)
                                        </h3>
                                        {timeData.length > 0 ? (
                                            <TimeInvestedChart data={timeData} />
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                                No data available
                                            </div>
                                        )}
                                    </div>

                                    {/* Non-Negotiables Completion */}
                                    <div>
                                        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
                                            Non-Negotiables Completion
                                        </h3>
                                        {nonNegotiablesData.totalCount > 0 ? (
                                            <NonNegotiablesChart
                                                completedCount={nonNegotiablesData.completedCount}
                                                totalCount={nonNegotiablesData.totalCount}
                                            />
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                                No data available
                                            </div>
                                        )}
                                    </div>

                                    {/* 6-Month Consistency */}
                                    <div>
                                        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
                                            6-Month Consistency (Last 26 Weeks)
                                        </h3>
                                        {consistencyData.length > 0 ? (
                                            <ConsistencyChart data={consistencyData} />
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                                No data available
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
