
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { Log } from '../../../types/history';
import HistoryTimelineEntry from './HistoryTimelineEntry';

interface HistoryTimelineProps {
    logs: Log[];
    isRefreshing: boolean;
    getMoodDetails: (log: Log) => { label: string; color: string; icon: string };
    handleToggleFavorite: (log: Log) => void;
}

const HistoryTimeline = ({ logs, isRefreshing, getMoodDetails, handleToggleFavorite }: HistoryTimelineProps) => {
    return (
        <div className={`timeline-container ${isRefreshing ? 'refreshing' : ''}`}>
            {isRefreshing && (
                <div className="timeline-overlay">
                    <div className="spinner-small" />
                </div>
            )}
            <div className="timeline">
                {logs.map(log => (
                    <HistoryTimelineEntry
                        key={log._id}
                        log={log}
                        moodDetails={getMoodDetails(log)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}

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
    );
};

export default HistoryTimeline;
