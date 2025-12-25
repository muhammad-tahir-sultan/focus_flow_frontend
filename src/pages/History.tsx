import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { backendUrl } from '../main';
import Loader from '../components/Loader';

interface Log {
    _id: string;
    date: string;
    timeSpent: number;
    description: string;
    reflection: string;
}

const History = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState('all');
    const [periodFilter, setPeriodFilter] = useState('this-month');
    const [moodFilter, setMoodFilter] = useState('all');

    const fetchLogs = async () => {
        try {
            const res = await axios.get<Log[]>(`${backendUrl}/daily-logs`);
            setLogs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    // Calculate stats
    const totalEntries = logs.length;
    const currentStreak = 12; // This would be calculated from actual data
    const avgFocus = logs.length > 0 
        ? (logs.reduce((sum, log) => sum + log.timeSpent, 0) / logs.length).toFixed(1)
        : '0.0';

    // Determine mood based on time spent (simple heuristic)
    const getMood = (timeSpent: number): { label: string; color: string; icon: string } => {
        if (timeSpent >= 6) return { label: 'HIGH FOCUS', color: '#3b82f6', icon: '⚡' };
        if (timeSpent >= 3) return { label: 'NEUTRAL', color: '#eab308', icon: '💡' };
        return { label: 'GOOD', color: '#22c55e', icon: '✓' };
    };

    if (loading) return <Loader />;

    return (
        <div className="history-page">
            {/* Breadcrumb Navigation */}
            <div className="breadcrumb">
                <Link to="/" className="breadcrumb-link">
                    <span className="breadcrumb-icon">🏠</span> Home
                </Link>
                <span className="breadcrumb-separator">/</span>
                <Link to="/reflections" className="breadcrumb-link">Reflections</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">History</span>
            </div>

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
                        <div className="stat-value">{currentStreak} Days</div>
                        <div className="stat-subtitle">Consistency is key.</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#3b82f6' }}>📝</div>
                    <div className="stat-content">
                        <div className="stat-label">Total Entries</div>
                        <div className="stat-value">{totalEntries}</div>
                        <div className="stat-subtitle">Since September 1st</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#3b82f6' }}>🎯</div>
                    <div className="stat-content">
                        <div className="stat-label">Avg. Focus</div>
                        <div className="stat-value">{avgFocus}<span className="stat-unit">/10</span></div>
                        <div className="stat-subtitle">Up 1.2 from last month</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
                <span className="filter-label">Filter by:</span>
                <select 
                    className="filter-dropdown"
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                >
                    <option value="all">All Time</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>

                <select 
                    className="filter-dropdown"
                    value={periodFilter}
                    onChange={(e) => setPeriodFilter(e.target.value)}
                >
                    <option value="this-month">This Month</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-3-months">Last 3 Months</option>
                </select>

                <select 
                    className="filter-dropdown"
                    value={moodFilter}
                    onChange={(e) => setMoodFilter(e.target.value)}
                >
                    <option value="all">Mood</option>
                    <option value="high">High Focus</option>
                    <option value="neutral">Neutral</option>
                    <option value="good">Good</option>
                </select>
            </div>

            {/* Timeline Entries */}
            <div className="timeline">
                {logs.map(log => {
                    const logDate = new Date(log.date);
                    const mood = getMood(log.timeSpent);
                    
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
                    <button className="load-more-btn">
                        Load More History <span className="refresh-icon">↻</span>
                    </button>
                </div>
            )}

            {/* New Entry Button (Mobile) */}
            <Link to="/log" className="btn btn-primary new-entry-btn">
                New Entry
            </Link>
        </div>
    );
};

export default History;
