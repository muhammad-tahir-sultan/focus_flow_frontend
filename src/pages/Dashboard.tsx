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

import StatCard from '../components/features/dashboard/StatCard';
import type { DashboardStats } from '../types/dashboard';
import Modal from '../components/common/Modal';
import { formatHours } from '../utils/dateUtils';
import '../styles/dashboard.css';

type TimelineRange = 'Week' | 'Month' | '3M' | '6M' | 'Year' | 'Custom';

interface Log {
    date: string;
    timeSpent: number;
    mood?: string;
}

interface Goal {
    status: string;
}

const Dashboard = () => {
    const { isAdmin } = useAuth();
    const [stats, setStats] = useState<DashboardStats>({
        streak: 0,
        activeGoals: 0,
        droppedGoals: 0,
        logsThisWeek: 0,
        totalTime: 0,
        consistencyScore: 0,
        dominantMood: 'N/A'
    });
    const [loading, setLoading] = useState(true);
    const [showGraphs, setShowGraphs] = useState(true);
    const [timeline, setTimeline] = useState<TimelineRange>('Month');
    const [allLogs, setAllLogs] = useState<Log[]>([]);
    const [allGoals, setAllGoals] = useState<Goal[]>([]);
    const [backendBaseStats, setBackendBaseStats] = useState<any>(null);
    const [showCustomPicker, setShowCustomPicker] = useState(false);
    const [customRange, setCustomRange] = useState({ start: '', end: '' });
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Analytics data
    const [streakData, setStreakData] = useState<{ date: string; value: number }[]>([]);
    const [timeData, setTimeData] = useState<{ date: string; value: number }[]>([]);
    const [nonNegotiablesData, setNonNegotiablesData] = useState({ completedCount: 0, totalCount: 0 });
    const [consistencyData, setConsistencyData] = useState<{ week: number; value: number }[]>([]);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [analyticsError, setAnalyticsError] = useState('');

    useEffect(() => {
        const fetchBaseData = async () => {
            try {
                const [logsRes, goalsRes, backendStatsRes] = await Promise.all([
                    axios.get<Log[]>(`${backendUrl}/daily-logs`),
                    axios.get<Goal[]>(`${backendUrl}/goals`),
                    axios.get<any>(`${backendUrl}/daily-logs/stats`)
                ]);

                setAllLogs(logsRes.data);
                setAllGoals(goalsRes.data);
                setBackendBaseStats(backendStatsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBaseData();
    }, []);

    useEffect(() => {
        if (!allLogs.length && !allGoals.length) return;

        const calculateTimelineStats = () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let startDate = new Date(today);
            let endDate = new Date(today);
            endDate.setHours(23, 59, 59, 999);

            if (timeline === 'Week') {
                startDate.setDate(today.getDate() - 7);
            } else if (timeline === 'Month') {
                startDate.setMonth(today.getMonth() - 1);
            } else if (timeline === '3M') {
                startDate.setMonth(today.getMonth() - 3);
            } else if (timeline === '6M') {
                startDate.setMonth(today.getMonth() - 6);
            } else if (timeline === 'Year') {
                startDate.setFullYear(today.getFullYear() - 1);
            } else if (timeline === 'Custom' && customRange.start && customRange.end) {
                startDate = new Date(customRange.start);
                endDate = new Date(customRange.end);
                endDate.setHours(23, 59, 59, 999);
            }

            const filteredLogs = allLogs.filter(l => {
                const d = new Date(l.date);
                return d >= startDate && d <= endDate;
            });

            // Active Goals (Context independent as they are current status)
            const activeGoals = allGoals.filter(g => g.status === 'Active').length;
            const droppedGoals = allGoals.filter(g => g.status === 'Dropped').length;

            const totalTime = filteredLogs.reduce((sum, l) => sum + (l.timeSpent || 0), 0);

            // Logs in this specific range for "Logs in Period"
            const logsInPeriod = filteredLogs.length;

            // Consistency Score for THIS period
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            const consistencyScore = Math.min(Math.round((logsInPeriod / diffDays) * 100), 100);

            // Dominant Mood Calculation
            const moodCounts: Record<string, number> = {};
            filteredLogs.forEach(l => {
                if (l.mood) {
                    moodCounts[l.mood] = (moodCounts[l.mood] || 0) + 1;
                }
            });

            let dominantMood = 'N/A';
            let maxCount = 0;
            const moodIcons: Record<string, string> = {
                high: '🔥 High',
                good: '✨ Good',
                neutral: '😐 Neutral',
                low: '📉 Low'
            };

            Object.entries(moodCounts).forEach(([mood, count]) => {
                if (count > maxCount) {
                    maxCount = count;
                    dominantMood = moodIcons[mood] || mood;
                }
            });

            setStats({
                streak: backendBaseStats?.streak || 0,
                activeGoals,
                droppedGoals,
                logsThisWeek: logsInPeriod,
                avgFocus: backendBaseStats?.avgFocus || 0,
                totalTime,
                consistencyScore,
                dominantMood
            });
        };

        calculateTimelineStats();
    }, [timeline, allLogs, allGoals, backendBaseStats, customRange]);

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


    return (
        <div className="dashboard-page">
            <div className="bg-gradient"></div>

            <div className="dashboard-content">
                <div className="dashboard-header mb-8">
                    <div>
                        <h2 className="text-sm" style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>System Time</h2>
                        <h1 className="heading-xl">
                            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            <span className="header-date-subtext">
                                {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                        </h1>
                    </div>

                    <div className="timeline-selector">
                        {(['Week', 'Month', '3M', '6M', 'Year'] as TimelineRange[]).map(r => (
                            <button
                                key={r}
                                className={`timeline-btn ${timeline === r ? 'active' : ''}`}
                                onClick={() => setTimeline(r)}
                            >
                                {r}
                            </button>
                        ))}
                        <button
                            className={`timeline-btn ${timeline === 'Custom' ? 'active' : ''}`}
                            onClick={() => setShowCustomPicker(true)}
                        >
                            📅 Custom
                        </button>
                    </div>

                    {isAdmin() && (
                        <Link to="/vision" className="btn-vision">
                            ✨ Long-term Vision
                        </Link>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <StatCard label="Current Streak" value={`${stats.streak} Days`} color="#3b82f6" />
                    <StatCard label="Active Goals" value={stats.activeGoals} />
                    <StatCard label="Dominant Mood" value={stats.dominantMood} color="#a855f7" />
                    <StatCard label={timeline === 'Custom' ? 'Logs in Range' : `Logs this ${timeline}`} value={stats.logsThisWeek} />
                    <StatCard label="Time Invested" value={formatHours(stats.totalTime)} color="#10b981" />
                    <StatCard label="Consistency" value={`${stats.consistencyScore}%`} color="#f59e0b" />
                </div>

                <Modal
                    show={showCustomPicker}
                    title="📅 SELECT TARGET RANGE"
                    onClose={() => setShowCustomPicker(false)}
                    footer={
                        <button
                            className="btn-confirm-abort"
                            onClick={() => {
                                setTimeline('Custom');
                                setShowCustomPicker(false);
                            }}
                        >
                            APPLY RANGE
                        </button>
                    }
                >
                    <div className="custom-range-inputs">
                        <div className="input-group">
                            <label>START DATE</label>
                            <input
                                type="date"
                                className="premium-input"
                                value={customRange.start}
                                onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>END DATE</label>
                            <input
                                type="date"
                                className="premium-input"
                                value={customRange.end}
                                onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                            />
                        </div>
                    </div>
                </Modal>

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
