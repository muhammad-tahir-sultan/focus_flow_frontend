import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../constants/api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { formatHours } from '../utils/dateUtils';
import '../styles/history.css';

interface Log {
    _id: string;
    date: string;
    timeSpent: number;
    description: string;
    reflection: string;
    mood?: 'high' | 'neutral' | 'good' | 'low';
    isFavorite?: boolean;
}

interface LogStats {
    totalLogs: number;
    streak: number;
    avgFocus: number;
    improvement: number;
    totalTime: number;
}

const History = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [stats, setStats] = useState<LogStats>({ totalLogs: 0, streak: 0, avgFocus: 0, improvement: 0, totalTime: 0 });
    const [initialLoading, setInitialLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [periodFilter, setPeriodFilter] = useState('this-month');
    const [moodFilter, setMoodFilter] = useState('all');

    const fetchLogs = async () => {
        try {
            if (logs.length === 0) setInitialLoading(true);
            else setIsRefreshing(true);
            const params: any = {};
            if (moodFilter !== 'all') params.mood = moodFilter;

            // Handle period/time filters
            const now = new Date();
            if (periodFilter === 'this-month') {
                params.startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
            } else if (periodFilter === 'last-month') {
                params.startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
                params.endDate = new Date(now.getFullYear(), now.getMonth(), 0).toISOString();
            } else if (periodFilter === 'last-3-months') {
                params.startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1).toISOString();
            }

            const [logsRes, statsRes] = await Promise.all([
                axios.get<Log[]>(`${BACKEND_URL}/daily-logs`, { params }),
                axios.get<LogStats>(`${BACKEND_URL}/daily-logs/stats`)
            ]);

            setLogs(logsRes.data);
            setStats(statsRes.data);
            if (isRefreshing) {
                toast.success('Reflection Timeline Updated', {
                    id: 'history-refresh',
                    duration: 2000,
                    style: { background: '#0f0f11', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' }
                });
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to reconstruct history. Terminal error.');
        } finally {
            setInitialLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [moodFilter, periodFilter]);

    const handleToggleFavorite = async (log: Log) => {
        try {
            await axios.patch(`${BACKEND_URL}/daily-logs/${log._id}`, {
                isFavorite: !log.isFavorite
            });
            setLogs(logs.map(l => l._id === log._id ? { ...l, isFavorite: !l.isFavorite } : l));

            if (!log.isFavorite) {
                toast.success('Added to Favorites.', {
                    style: {
                        background: '#0f0f11',
                        color: '#fff',
                        border: '1px solid rgba(234, 179, 8, 0.2)',
                    },
                    icon: '⭐',
                });
            }
        } catch (err) {
            console.error('Failed to toggle favorite', err);
            toast.error('Failed to update favorite status.');
        }
    };


    // Use stored mood or fallback to heuristic
    const getMoodDetails = (log: Log): { label: string; color: string; icon: string } => {
        if (log.mood) {
            const moods: Record<string, any> = {
                high: { label: 'HIGH FOCUS', color: '#3b82f6', icon: '⚡' },
                neutral: { label: 'NEUTRAL', color: '#eab308', icon: '💡' },
                good: { label: 'GOOD', color: '#22c55e', icon: '✓' },
                low: { label: 'LOW', color: '#ef4444', icon: '📉' }
            };
            return moods[log.mood] || moods.neutral;
        }

        if (log.timeSpent >= 6) return { label: 'HIGH FOCUS', color: '#3b82f6', icon: '⚡' };
        if (log.timeSpent >= 3) return { label: 'NEUTRAL', color: '#eab308', icon: '💡' };
        return { label: 'GOOD', color: '#22c55e', icon: '✓' };
    };

    if (initialLoading) return <Loader />;

    return (
        <div className="history-page">
            <div className="bg-gradient"></div>

            {/* Header Section */}
            <div className="history-header">
                <h1 className="history-title">Reflection History</h1>
                <p className="history-subtitle">
                    Review your journey. Find patterns in your past to build clarity for tomorrow.
                </p>
                <div className="history-quote">
                    <p className="quote-text">"There is no power on earth that can undo Pakistan."</p>
                    <p className="quote-author">— MUHAMMAD ALI JINNAH</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#3b82f6' }}>🔥</div>
                    <div className="stat-content">
                        <div className="stat-label">Current Streak</div>
                        <div className="stat-value">{stats.streak} Days</div>
                        <div className="stat-subtitle">Consistency is key.</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#3b82f6' }}>📝</div>
                    <div className="stat-content">
                        <div className="stat-label">Total Entries</div>
                        <div className="stat-value">{stats.totalLogs}</div>
                        <div className="stat-subtitle">Focus Flow Lifetime</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#3b82f6' }}>🎯</div>
                    <div className="stat-content">
                        <div className="stat-label">Avg. Focus</div>
                        <div className="stat-value">{stats.avgFocus}<span className="stat-unit">h</span></div>
                        <div className="stat-subtitle">
                            {stats.improvement >= 0 ? '↗' : '↘'} {Math.abs(stats.improvement).toFixed(1)}h from last month
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#10b981' }}>⌛</div>
                    <div className="stat-content">
                        <div className="stat-label">Total Invested</div>
                        <div className="stat-value">{formatHours(stats.totalTime)}</div>
                        <div className="stat-subtitle">Mission Duration Sum</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-container">
                <div className="filter-group">
                    <span className="filter-group-label">
                        <span className="filter-icon">📅</span> Time Period
                    </span>
                    <select
                        className="filter-dropdown"
                        value={periodFilter}
                        onChange={(e) => setPeriodFilter(e.target.value)}
                    >
                        <option value="this-month">This Month</option>
                        <option value="last-month">Last Month</option>
                        <option value="last-3-months">Last 3 Months</option>
                    </select>
                </div>

                <div className="divider-vr" />

                <div className="filter-group">
                    <span className="filter-group-label">
                        <span className="filter-icon">⚡</span> Focus Level
                    </span>
                    <select
                        className="filter-dropdown"
                        value={moodFilter}
                        onChange={(e) => setMoodFilter(e.target.value)}
                    >
                        <option value="all">Every Mood</option>
                        <option value="high">High Focus</option>
                        <option value="neutral">Neutral</option>
                        <option value="good">Good Focus</option>
                        <option value="low">Low Focus</option>
                    </select>
                </div>
            </div>

            {/* Timeline Entries Container */}
            <div className={`timeline-container ${isRefreshing ? 'refreshing' : ''}`}>
                {isRefreshing && (
                    <div className="timeline-overlay">
                        <div className="spinner-small" />
                    </div>
                )}
                <div className="timeline">
                    {logs.map(log => {
                        const logDate = new Date(log.date);
                        const mood = getMoodDetails(log);

                        return (
                            <div key={log._id} className="timeline-entry">
                                <div className="timeline-date-badge">
                                    <div className="date-day-name">
                                        {logDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                                    </div>
                                    <div className="date-day">{logDate.getDate()}</div>
                                    <div className="date-month">
                                        {logDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                                    </div>
                                </div>

                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <h3 className="timeline-title">{log.description.split('\n')[0] || 'Daily Reflection'}</h3>
                                        <div className="mood-badge" style={{
                                            backgroundColor: `${mood.color}20`,
                                            color: mood.color,
                                            borderColor: mood.color
                                        }}>
                                            <span className="mood-icon">{mood.icon}</span>
                                            {mood.label}
                                        </div>
                                    </div>

                                    <p className="timeline-description">
                                        {log.reflection}
                                    </p>

                                    <div className="timeline-footer">
                                        <div className="timeline-tags">
                                            <span className="tag">
                                                <span className="tag-icon">⏱️</span>
                                                {log.timeSpent}h Focus
                                            </span>
                                            <span className="tag">
                                                <span className="tag-icon">💡</span>
                                                Insight
                                            </span>
                                        </div>
                                        <div className="timeline-actions">
                                            <button
                                                className={`action-icon-btn ${log.isFavorite ? 'active' : ''}`}
                                                onClick={() => handleToggleFavorite(log)}
                                                title={log.isFavorite ? 'Unfavorite' : 'Favorite'}
                                            >
                                                {log.isFavorite ? '⭐' : '☆'}
                                            </button>
                                            <Link to={`/log/${log._id}`} className="action-icon-btn" title="Edit">
                                                ✏️
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {logs.length === 0 && (
                        <div className="empty-state">
                            <p>No reflections yet. Start your journey today!</p>
                            <Link to="/log" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                Create First Entry
                            </Link>
                        </div>
                    )}
                </div>

                {/* Load More Button */}
                {logs.length > 0 && (
                    <div className="load-more-container">
                        <button
                            className="load-more-btn"
                            onClick={() => {
                                toast.loading('Retrieving deeper archives...', { id: 'load-more', duration: 1500 });
                                setTimeout(() => {
                                    toast.success('History expansion complete.', { id: 'load-more' });
                                }, 1500);
                            }}
                        >
                            Load More History <span className="refresh-icon">↻</span>
                        </button>
                    </div>
                )}
            </div>

            {/* New Entry Button (Mobile) */}
            <Link to="/log" className="btn btn-primary new-entry-btn">
                New Entry
            </Link>
        </div>
    );
};

export default History;
