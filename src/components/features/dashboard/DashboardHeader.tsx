
import { Link } from 'react-router-dom';
import type { TimelineRange } from '../../../types/dashboard';

interface DashboardHeaderProps {
    currentTime: Date;
    timeline: TimelineRange;
    setTimeline: (range: TimelineRange) => void;
    setShowCustomPicker: (show: boolean) => void;
    isAdmin: boolean;
}

const DashboardHeader = ({ currentTime, timeline, setTimeline, setShowCustomPicker, isAdmin }: DashboardHeaderProps) => {
    return (
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
                {['Week', 'Month', '3M', '6M', 'Year'].map((r) => (
                    <button
                        key={r}
                        className={`timeline-btn ${timeline === r ? 'active' : ''}`}
                        onClick={() => setTimeline(r as TimelineRange)}
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

            {isAdmin && (
                <Link to="/vision" className="btn-vision">
                    ✨ Long-term Vision
                </Link>
            )}
        </div>
    );
};

export default DashboardHeader;
