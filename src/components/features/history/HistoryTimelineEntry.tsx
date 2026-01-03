import { Link } from 'react-router-dom';
import type { Log } from '../../../types/history';

interface HistoryTimelineEntryProps {
    log: Log;
    moodDetails: { label: string; color: string; icon: string };
    onToggleFavorite: (log: Log) => void;
}

const HistoryTimelineEntry = ({ log, moodDetails, onToggleFavorite }: HistoryTimelineEntryProps) => {
    const logDate = new Date(log.date);

    return (
        <div className="timeline-entry">
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
                        backgroundColor: `${moodDetails.color}20`,
                        color: moodDetails.color,
                        borderColor: moodDetails.color
                    }}>
                        <span className="mood-icon">{moodDetails.icon}</span>
                        {moodDetails.label}
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
                            onClick={() => onToggleFavorite(log)}
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
};

export default HistoryTimelineEntry;
