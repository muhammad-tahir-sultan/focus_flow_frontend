import StatCard from './StatCard';
import { formatHours } from '../../../utils/dateUtils';
import type { DashboardStats, TimelineRange } from '../../../types/dashboard';

import {
    IconFire, IconTrophy, IconSmile, IconPen, IconClock, IconChart,
    IconMoodHigh, IconMoodGood, IconMoodNeutral, IconMoodLow
} from '../../layout/NavbarIcons';

interface DashboardStatsGridProps {
    stats: DashboardStats;
    timeline: TimelineRange;
}

const getMoodIcon = (mood: string) => {
    switch (mood) {
        case 'High': return <IconMoodHigh />;
        case 'Good': return <IconMoodGood />;
        case 'Neutral': return <IconMoodNeutral />;
        case 'Low': return <IconMoodLow />;
        default: return <IconSmile />;
    }
};

const getMoodColor = (mood: string) => {
    switch (mood) {
        case 'High': return '#ef4444'; // Red-ish for High Energy
        case 'Good': return '#f59e0b'; // Amber for Good
        case 'Neutral': return '#3b82f6'; // Blue for Stable
        case 'Low': return '#64748b'; // Gray for Low
        default: return '#a855f7';
    }
};

const DashboardStatsGrid = ({ stats, timeline }: DashboardStatsGridProps) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <StatCard icon={<IconFire />} label="Current Streak" value={`${stats.streak} Days`} color="#3b82f6" />
            <StatCard icon={<IconTrophy />} label="Active Goals" value={stats.activeGoals} color="#facc15" />
            <StatCard
                icon={getMoodIcon(stats.dominantMood)}
                label="Dominant Mood"
                value={stats.dominantMood}
                color={getMoodColor(stats.dominantMood)}
            />
            <StatCard icon={<IconPen />} label={timeline === 'Custom' ? 'Logs in Range' : `Logs this ${timeline}`} value={stats.logsThisWeek} color="#22d3ee" />
            <StatCard icon={<IconClock />} label="Time Invested" value={formatHours(stats.totalTime)} color="#10b981" />
            <StatCard icon={<IconChart />} label="Consistency" value={`${stats.consistencyScore}%`} color="#f59e0b" />
        </div>
    );
};

export default DashboardStatsGrid;
