import { formatHours } from '../../../utils/dateUtils';
import type { LogStats } from '../../../types/history';

interface HistoryStatsGridProps {
    stats: LogStats;
}

const HistoryStatsGrid = ({ stats }: HistoryStatsGridProps) => {
    return (
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
    );
};

export default HistoryStatsGrid;
