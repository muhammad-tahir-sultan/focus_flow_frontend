import StatCard from './StatCard';
import { formatHours } from '../../../utils/dateUtils';
import type { DashboardStats, TimelineRange } from '../../../types/dashboard';

interface DashboardStatsGridProps {
    stats: DashboardStats;
    timeline: TimelineRange;
}

const DashboardStatsGrid = ({ stats, timeline }: DashboardStatsGridProps) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <StatCard label="Current Streak" value={`${stats.streak} Days`} color="#3b82f6" />
            <StatCard label="Active Goals" value={stats.activeGoals} />
            <StatCard label="Dominant Mood" value={stats.dominantMood} color="#a855f7" />
            <StatCard label={timeline === 'Custom' ? 'Logs in Range' : `Logs this ${timeline}`} value={stats.logsThisWeek} />
            <StatCard label="Time Invested" value={formatHours(stats.totalTime)} color="#10b981" />
            <StatCard label="Consistency" value={`${stats.consistencyScore}%`} color="#f59e0b" />
        </div>
    );
};

export default DashboardStatsGrid;
